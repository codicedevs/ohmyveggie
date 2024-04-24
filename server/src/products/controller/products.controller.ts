import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { ProductDto } from "../dtos/product.dto";
import { ReviewDto } from "../dtos/review.dto";
import { ProductsService } from "../services/products.service";
import { FilterQuery } from "mongoose";
import { ProductDocument } from "../schemas/product.schema";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query("pageId") pageId: string,
    @Query() filter: FilterQuery<ProductDocument>
  ) {
    return this.productsService.findMany(pageId, filter);
  }
  

  @Get("topRated")
  getTopRatedProducts() {
    return this.productsService.findTopRated();
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

  @UseGuards(AdminGuard)
  @Post()
  createProduct() {
    return this.productsService.createSample();
  }

  @UseGuards(AdminGuard)
  @Put(":id")
  updateProduct(@Param("id") id: string, @Body() product: ProductDto) {
    return this.productsService.update(id, product);
  }

  @UseGuards(AuthGuard)
  @Put(":id/review")
  createReview(
    @Param("id") id: string,
    @Body() { rating, comment }: ReviewDto,
    @Session() session: any
  ) {
    return this.productsService.createReview(id, session.user, rating, comment);
  }
}

@Controller("categories")
export class ProductsCategoriesController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async getAllCategories(): Promise<string[]> {
    return this.productsService.getAllCategories();
  }
}

@Controller("brands")
export class ProductsBrandsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async getAllBrands(): Promise<string[]> {
    return this.productsService.getAllBrands();
  }
}
