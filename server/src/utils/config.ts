import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { SessionOptions } from 'express-session';
import { serverSetting } from 'src/settings';

export const connectDB = (
  configService: ConfigService
): MongooseModuleOptions => {
  const dbPassword = configService.get<string>('DB_PASSWORD');
  const dbName = configService.get<string>('DB_NAME');
  const mongodbUri = serverSetting.DB_URL + serverSetting.DB_DATABASE;

  return {
    uri: mongodbUri,
    autoIndex: false,
  };
};

export const corsConfig = (): CorsOptions => ({
  origin: ["https://codice.dev:4000"],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

});

export const sessionConfig = (MongoDBStore: any): SessionOptions => ({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie:
    process.env.NODE_ENV === 'production'
      ? {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      }
      : { maxAge: 3 * 24 * 60 * 60 * 1000 },
  store: new MongoDBStore({
    uri: `${serverSetting.DB_URL}${serverSetting.DB_DATABASE}`,
    collection: 'sessions',
  }),
});
