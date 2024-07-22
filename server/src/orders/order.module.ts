import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersController } from "./controller/orders.controller";
import { Order, OrderSchema } from "./schemas/order.schema";
import { OrdersService } from "./services/orders.service";
import {
  ShippingDetails,
  shippingDetailsSchema,
} from "./schemas/shipping.detail.schema";
import { CartService } from "src/cart/services/cart.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: ShippingDetails.name,
        schema: shippingDetailsSchema,
      },
    ]),
    CartService,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, CartService],
})
export class OrderModule {}
