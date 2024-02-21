import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ProductEventHandler {
    @OnEvent('CSVDATA')
    handleCsvDataReceived(csvData: any[]) {
        console.log("csvData", csvData)
    }
}