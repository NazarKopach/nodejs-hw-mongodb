import { OAuth2Client } from 'google-auth-library';
import * as path from 'node:path';
import { readFile } from 'node:fs/promises';
import { getEnvVar } from '../utils/getEnvVar.js';
import createError from 'http-errors';

const googleOautnJSONPath = path.resolve('google-oauth.json');

const oauthConfig = JSON.parse(await readFile(googleOautnJSONPath, 'utf-8'));

const clientId = getEnvVar('GOOGLE_OAUTH_CLIENT_ID');

const clientSecret = getEnvVar('GOOGLE_OAUTH_CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response?.tokens?.id_token) throw createError(401, 'Google OAuth code invalid');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getUsernameFromGoogleTokenPayload = (payload) => {
  if (payload.name) return payload.name;
  let name = '';
  if (payload.given_name) {
    name += payload.given_name;
  }
  if (payload.given_name && payload.family_name) {
    name += ` ${payload.family_name}`;
  }
  if (!payload.given_name && payload.family_name) {
    name = payload.family_name;
    return name;
  }
};
