import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Product } from "./schemas/product.schema";
import { ProductsService } from "./services/products.service";

@Injectable()
export class ProductEventHandler {
    constructor(private productsService: ProductsService) { }
    @OnEvent('CSVDATA')
    async handleCsvDataReceived(csvData: any) {
        const product = transform(csvData.fullDocument)
        const result = await this.productsService.productModel.updateOne({ externalId: product.externalId }, product, { upsert: true })
        console.log(result)
    }
}

const transform = (rawProduct: any): Product => {
    const product = new Product()
    product.externalId = rawProduct.id
    product.name = rawProduct.nombre
    product.brand = rawProduct.marca_nombre
    product.countInStock = rawProduct.stock
    product.category = rawProduct.categoria_nombre
    product.price = rawProduct.precio_standard
    return product
}
