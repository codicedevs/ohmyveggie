import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { corsConfig, sessionConfig } from "./utils/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { attachTransformEventHandler } from "./utils/attach-transform-event-handler";
import { serverSetting } from "./settings";
import { getProtocolConfig } from "./utils/ssl";
import * as bodyParser from "body-parser";

const MongoDBStore = require("connect-mongodb-session")(session);

async function bootstrap() {
  const { key, cert, protocol } = getProtocolConfig();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    protocol == "https" ? { httpsOptions: { key, cert } } : undefined
  );
  //Agrandamos el limite para que entre el CSV
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  app.set("trust proxy", 1); // trust first proxy
  app.enableCors(corsConfig());
  app.use(session(sessionConfig(MongoDBStore)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // await attachTransformEventHandler()
  // Conecta a la base de datos MongoDB
  // await app.listen(serverSetting.PORT);

  console.log("port", serverSetting.PORT);

  await app.listen(serverSetting.PORT, "0.0.0.0", () => {
    console.log(
      `App listening on http://0.0.0.0:${serverSetting.PORT} for IPv4/v6`
    );
  });
}
bootstrap();
