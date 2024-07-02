import * as dotenv from "dotenv";
dotenv.config();

export const serverSetting = Object.freeze({
  PORT: +(process.env.SERVER_PORT ?? 4000),
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_URL: process.env.DB_URL
});

export const jwtSetting = Object.freeze({
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
});

export const smtpSettings = Object.freeze({
  HOST: process.env.SMTP_SERVER!,
  PORT: +process.env.SMTP_PORT,
  SECURE: true,
  AUTH_USER: process.env.SMTP_USERNAME,
  AUTH_PASS: process.env.SMTP_PASSWORD,
})

export const mercadoPagoSettings = Object.freeze({
  MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN
})

