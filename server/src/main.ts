import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { corsConfig, sessionConfig } from './utils/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MongoClient } from 'mongodb';
import { EventEmitter2 } from '@nestjs/event-emitter';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1); // trust first proxy
  app.enableCors(corsConfig());
  app.use(session(sessionConfig(MongoDBStore)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Inicializa el servicio EventEmitterService

  // Conecta a la base de datos MongoDB
  const client = new MongoClient(process.env.MONGODB_URL, { monitorCommands: true });
  await client.connect();
  const db = client.db('ohmyveggie');
  const collection = db.collection('prueba');
  // Establece un Change Stream en la colección
  const changeStream = collection.watch();
  const eventEmitter = app.get(EventEmitter2);
  // Escucha los cambios en la colección
  changeStream.on('change', (change: any) => {
    console.log('Cambio detectado en la base de datos:', change);
    eventEmitter.emit('databaseChange', change);

  });

  await app.listen(process.env.PORT);
}
bootstrap();
