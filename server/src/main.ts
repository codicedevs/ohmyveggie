import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { corsConfig, sessionConfig } from './utils/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { MongoClient } from 'mongodb';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1); // trust first proxy
  app.enableCors(corsConfig());
  app.use(session(sessionConfig(MongoDBStore)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Inicializa el servicio EventEmitterService

  // Conecta a la base de datos MongoDB
  const client = new MongoClient('mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net/', { monitorCommands: true });
  await client.connect();
  const db = client.db('ohmyveggie');
  const collection = db.collection('prueba');

  // Establece un Change Stream en la colección
  const changeStream = collection.watch();

  // Escucha los cambios en la colección
  changeStream.on('change', (change: any) => {
    console.log('Cambio detectado en la base de datos:', change);
    // Realiza acciones adicionales según sea necesario en respuesta al cambio
  });

  await app.listen(process.env.PORT);
}
bootstrap();
