import { Module } from "@nestjs/common";
import { ProductsService } from "./services/products.service";
import {
  ProductsCategoriesController,
  ProductsController,
} from "./controller/products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import { CategoriesModule } from "src/categories/categories.module";
import { CategoriesService } from "src/categories/categories.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
        collection: "products",
      },
    ]),
    CategoriesModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController, ProductsCategoriesController],
})
export class ProductsModule {}
