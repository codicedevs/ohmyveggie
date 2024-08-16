import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { PaginatedProducts } from "src/interfaces";
import { Product, ProductDocument } from "../schemas/product.schema";
import { ProductDto } from "../dtos/product.dto";
import {
  Category,
  CategoryDocument,
} from "src/categories/schemas/category.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) public productModel: Model<ProductDocument>,
    @InjectModel(Category.name) public categoryModel: Model<CategoryDocument>
  ) {}

  async findMany(
    pageId: string,
    filter?: FilterQuery<ProductDocument>
  ): Promise<ProductDocument[] | PaginatedProducts> {
    const pageSize = 10;
    const page = parseInt(pageId) || 1; //si no se proporciona pageId entrega 1
    if (!filter) {
      // Si no se proporciona un filtro busca todos los productos
      const products = await this.productModel.find().populate("categories");
      if (!products.length)
        throw new NotFoundException("No hay productos con esos filtros");
      return products;
    }

    const categ = await this.categoryModel.findOne({ name: filter.categories });
    const query: FilterQuery<ProductDocument> = {};

    if (filter.keyword) {
      query.name = { $regex: new RegExp(filter.keyword, "i") };
    }
    if (filter.categories) {
      query.categories = categ._id;
    }
    const count = await this.productModel.countDocuments(query);
    const products = await this.productModel
      .find(query)
      .populate("categories")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (!products.length)
      throw new NotFoundException("No hay productos con esos filtros");

    return { products, page, pages: Math.ceil(count / pageSize) };
  }

  async findById(id: string): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Invalid product ID.");

    const product = await this.productModel.findById(id).populate("categories");

    if (!product) throw new NotFoundException("No product with given ID.");

    return product;
  }

  async createMany(
    products: Partial<ProductDocument>[]
  ): Promise<ProductDocument[]> {
    const createdProducts = await this.productModel.insertMany(products);

    return createdProducts;
  }

  async createOne(productDetails: ProductDto): Promise<ProductDocument> {
    const categories = await this.categoryModel
      .find({ _id: { $in: productDetails.categories } })
      .exec();
    console.log("back", productDetails);
    const createdProduct = new this.productModel({
      ...productDetails,
      categories,
    });
    return this.productModel.create(createdProduct);
  }

  async update(
    id: string,
    attrs: Partial<ProductDocument>
  ): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid product ID.");
    }

    console.log("lo que llega para cambiar", attrs);

    for (let i = 0; i < attrs.categories.length; i++) {
      if (attrs.categories[i].customOption) {
        const newCat = { name: attrs.categories[i].name };
        const catToPut = await this.categoryModel.create(newCat);
        attrs.categories[i] = catToPut;
      }
    }
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      attrs,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new NotFoundException("No product with given ID.");
    }

    return updatedProduct;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Invalid product ID.");

    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException("No product with given ID.");

    await product.remove();
  }

  async deleteMany(): Promise<void> {
    await this.productModel.deleteMany({});
  }

  async getAllCategories(): Promise<string[]> {
    const categories = await this.productModel.distinct("category").exec();
    return categories;
  }
}
