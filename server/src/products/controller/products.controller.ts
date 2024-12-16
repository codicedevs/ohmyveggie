import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { ProductsService } from "../services/products.service";
import { FilterQuery, Model } from "mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";
import { Public } from "src/utils/skip-auth";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @UseGuards(AdminGuard)
  @Post()
  createProduct(@Body() productDetails: CreateProductDto) {
    return this.productsService.createOne(productDetails);
  }

  @Get()
  getProducts(
    @Query("pageId") pageId: string,
    @Query() filter: FilterQuery<ProductDocument>
  ) {
    return this.productsService.findMany(pageId, filter);
  }

  @Get(":id")
  getProduct(@Param("id") id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.productsService.deleteOne(id);
  }

  // @UseGuards(AdminGuard)
  @Put(":id")
  updateProduct(@Param("id") id: string, @Body() product: UpdateProductDto) {
    return this.productsService.update(id, product);
  }

  @Public()
  @Post("script/add")
  async addCSVProducts(@Body() products) {
    console.log("cuantos products", products);
    await this.productsService.importCSVProducts(products);
  }
}

@Controller("categoriesViejo")
export class ProductsCategoriesController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async getAllCategories(): Promise<string[]> {
    return this.productsService.getAllCategories();
  }
}
