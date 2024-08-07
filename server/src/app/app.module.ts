import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { connectDB } from "../utils/config";
import { ProductsModule } from "../products/products.module";
import { UsersModule } from "src/users/users.module";
import { CommandModule } from "nestjs-command";
import { CartModule } from "src/cart/cart.module";
import { OrderModule } from "../orders/order.module";
import { AppController } from "./controllers/app.controller";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { AppService } from "./services/app.service";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PaymentModule } from "src/payments/payments-module";
import { CategoriesModule } from "src/categories/categories.module";
import { Product, ProductSchema } from "src/products/schemas/product.schema";
import {
  Category,
  CategorySchema,
} from "src/categories/schemas/category.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    CommandModule,
    ProductsModule,
    UsersModule,
    CartModule,
    OrderModule,
    CloudinaryModule,
    PaymentModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
