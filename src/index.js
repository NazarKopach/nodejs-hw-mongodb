import { initMongoConnection } from './db/initMongoDb.js';
import { setupServer } from './server.js';

const boostrap = async () => {
  await initMongoConnection();
  setupServer();
};
boostrap();
