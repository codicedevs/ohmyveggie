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
import { match } from "assert";
import { showCompletionScript } from "yargs";

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
    const { isAdmin, ...restFilter } = filter;

    if (isAdmin === "false" && !restFilter.keyword && !restFilter.categories) {
      const products = await this.productModel
        .find({
          countInStock: { $gt: 0 },
        })
        .populate("categories")
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      if (!products.length)
        throw new NotFoundException("No hay productos con esos filtros");
      const count = await this.productModel
        .find({
          countInStock: { $gt: 0 },
        })
        .countDocuments();

      return { products, page, pages: Math.ceil(count / pageSize) };
    }

    const categ = await this.categoryModel.findOne({ name: filter.categories });
    const query: FilterQuery<ProductDocument> = {};

    if (filter.isAdmin === "false") {
      query.countInStock = { $gt: 0 };
    }

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

  async importCSVProducts(products: any): Promise<string> {
    const productsDB = await this.productModel.find({});

    const changedProducts = getModifiedProducts(
      productsDB,
      products,
      compareFields
    );
    const newProducts = getNewProducts(productsDB, products);
    const deletedProducts = getDeletedProducts(productsDB, products);

    const bulkOperations = [];

    changedProducts.forEach((product) => {
      bulkOperations.push({
        updateOne: {
          filter: { externalId: product.externalId },
          update: { $set: product },
          upsert: true,
        },
      });
    });

    newProducts.forEach((product) => {
      bulkOperations.push({
        insertOne: {
          document: product,
        },
      });
    });

    deletedProducts.forEach((product) => {
      bulkOperations.push({
        deleteOne: {
          filter: { externalId: product.externalId },
        },
      });
    });

    if (bulkOperations.length > 0) {
      await this.productModel
        .bulkWrite(bulkOperations)
        .then((response) => console.log("funciono", response))
        .catch((err) => console.log("no funciono", err));
    }

    // if (changedProducts.length > 0) {
    //   await Promise.all(
    //     changedProducts.map((product: Product) =>
    //       this.productModel.updateMany(
    //         { externalId: product.externalId },
    //         { $set: product },
    //         { upsert: true }
    //       )
    //     )
    //   );
    // }

    // if (newProducts.length > 0) {
    //   await Promise.all(
    //     newProducts.map((product: Product) => this.productModel.create(product))
    //   );
    // }

    // if (deletedProducts.length > 0) {
    //   await Promise.all(
    //     deletedProducts.map((product: Product) =>
    //       this.productModel.deleteOne({ externalId: product.externalId })
    //     )
    //   );
    // }

    // const activeIds = products.map((product) => product.externalId);
    // // Eliminar productos inactivos

    // await this.productModel.deleteMany({ externalId: { $nin: activeIds } });

    return "ok";
  }
}
function getModifiedProducts(prodDB, prodExtCsv, keysToCompare) {
  const idKey = "externalId";
  const result = prodExtCsv.filter((itemNew) => {
    const itemMatchDB = prodDB.find((itemOld) => {
      return itemOld[idKey] === itemNew[idKey];
    });

    if (itemMatchDB) {
      const hasDifference = keysToCompare.some((key) => {
        return itemNew[key] !== itemMatchDB[key];
      });
      if (hasDifference) console.log("se cambio", itemMatchDB);
      return hasDifference;
    }
    return false;
  });

  return result;
}

function getNewProducts(prodDB, prodExtCsv) {
  const idsInDB = new Set(prodDB.map((item) => item.externalId));
  return prodExtCsv.filter((item) => !idsInDB.has(String(item.externalId)));
}
function getDeletedProducts(prodDB, prodExtCsv) {
  const idsInCsv = new Set(prodExtCsv.map((item) => String(item.externalId)));
  const result = prodDB.filter((item) => {
    if (!idsInCsv.has(item.externalId)) {
      console.log("hay que borrar este", item);
      console.log("el producto a borrar que esta en el CSV");
      return true;
    }
  });

  //los que se borraron son los items que no estan en el CSV y si estan en la DB

  console.log("los que se borraron", result.length);

  return result;
}

const compareFields = ["name", "price", "countInStock", "activo"];
