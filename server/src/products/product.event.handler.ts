import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ProductsService } from "./services/products.service";
import transform from "src/utils/transform";

@Injectable()
export class ProductEventHandler {
    constructor(private productsService: ProductsService) { }
    @OnEvent('CSVDATA')
    async handleCsvDataReceived(csvData: any) {
        const product = transform(csvData.fullDocument)
        const result = await this.productsService.productModel.updateOne({ externalId: product.externalId }, product, { upsert: true })
    }
}


