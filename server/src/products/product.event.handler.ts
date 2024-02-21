import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductEventHandler {
    @OnEvent('CSVDATA')
    handleCsvDataReceived(csvData: any[]) {
        const product = transform(csvData)
    }
}

const transform = (rawProduct: any): Product => {
    const product = new Product()
    product.name = rawProduct.fullDocument.nombre
    product.brand = rawProduct.fullDocument.marca_nombre
    product.countInStock =rawProduct.fullDocument.stock

    return product
}