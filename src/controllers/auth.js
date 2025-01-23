import * as authServices from '../services/auth.js';
import { generateOAuthUrl } from '../utils/GoogleOAuth2.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const data = await authServices.register(req.body);
  const user = data.toObject ? data.toObject() : data;
  const { password, ...userNoPassword } = user;

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userNoPassword,
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await authServices.refreshToken({ refreshToken, sessionId });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: session.accessToken,
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logout(req.cookies.sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await authServices.requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await authServices.resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const getGoogleOauthUrlController = async (req, res) => {
  const url = generateOAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { code } = req.body;
  const session = await authServices.loginOrRegisterWithGoogle(code);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged with Google OAuth!',
    data: { accessToken: session.accessToken },
  });
};
