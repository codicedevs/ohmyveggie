import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsBrandsController, ProductsCategoriesController, ProductsController } from './controller/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
        collection:"products"
      },
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController,ProductsCategoriesController,ProductsBrandsController],
})
export class ProductsModule {}
