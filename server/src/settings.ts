import * as dotenv from "dotenv";
dotenv.config();

export const serverSetting = Object.freeze({
    PORT: +(process.env.SERVER_PORT ?? 3001),
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_URL: process.env.DB_URL
});

export const jwtSetting = Object.freeze({
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
   
  });
  