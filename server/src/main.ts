import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { corsConfig, sessionConfig } from './utils/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { attachTransformEventHandler } from './utils/attach-transform-event-handler';
import { serverSetting } from './settings';
import { getProtocolConfig } from './utils/ssl';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const { key, cert, protocol } = getProtocolConfig("/etc/letsencrypt/live/www.codice.dev/privkey.pem", "/etc/letsencrypt/live/www.codice.dev/fullchain.pem");
  const app = await NestFactory.create<NestExpressApplication>(AppModule, protocol == 'https' ? { httpsOptions: { key, cert } } : undefined)
  app.set('trust proxy', 1); // trust first proxy
  app.enableCors(corsConfig());
  app.use(session(sessionConfig(MongoDBStore)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await attachTransformEventHandler() // Conecta a la base de datos MongoDB
  await app.listen(serverSetting.PORT);
}
bootstrap();
