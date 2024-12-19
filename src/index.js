import { initMongoConnection } from './db/initMongoDB.js';
import { setupServer } from './server.js';

const boostrap = async () => {
  await initMongoConnection();
  setupServer();
};
boostrap();
