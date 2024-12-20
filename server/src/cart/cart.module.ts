import { Module } from "@nestjs/common";
import { CartService } from "./services/cart.service";
import { CartController } from "./controller/cart.controller";

@Module({
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
