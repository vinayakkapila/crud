// ESM
import Fastify from 'fastify';
import { sequelize } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

import './models/userModel.js';
import './models/addressModel.js';

import { userRoutes } from './routes/userRoutes.js';
import { addressRoutes } from './routes/addressRoutes.js';

const fastify = Fastify({
  logger: true
});

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});

fastify.register(userRoutes, { prefix: '/api' });
fastify.register(addressRoutes, { prefix: '/api' });

// Start server
const start = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log(' Database connected successfully');

    // Sync models (optional, for development)
    // await sequelize.sync({ alter: true }); 
    

    // Listen on port
    await fastify.listen({ port: parseInt(process.env.PORT as string, 10) });
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
