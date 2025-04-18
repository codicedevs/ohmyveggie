import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { OrdersService } from "../services/orders.service";
import { Order, OrderDocument } from "../schemas/order.schema";
import { DateRange } from "src/interfaces";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CartService } from "src/cart/services/cart.service";

@Controller("orders")
export class OrdersController {
  @InjectModel(Order.name) private orderModel: Model<OrderDocument>;
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: any, @Session() session: any) {
    this.cartService.cart = session.cart
      ? session.cart
      : {
          cartItems: [],
          shippingDetails: {},
        };
    session.cart.cartItems = [];
    return this.ordersService.create(body, session.user._id);
  }
  @UseGuards(AdminGuard)
  @Get()
  getOrders(@Query("filter") filter: string, @Query("pageId") pageId: string) {
    let parsedFilter: FilterQuery<OrderDocument> = {};

    if (filter) {
      try {
        parsedFilter = JSON.parse(filter);
      } catch (error) {
        throw new BadRequestException("Invalid filter format");
      }
    }

    return this.ordersService.findMany(pageId, parsedFilter);
  }

  @UseGuards(AdminGuard)
  @Get("/find-by-day")
  async findByDay(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<Order[]> {
    if (new Date(endDate) < new Date(startDate)) {
      throw new BadRequestException("endDate cannot be less than startDate");
    }
    const dateRange: DateRange = { startDate, endDate };
    const orders = await this.ordersService.findByDay(dateRange);
    return orders;
  }

  @UseGuards(AuthGuard)
  @Get("myorders")
  async getUserOrders(@Session() session: any) {
    return this.ordersService.findUserOrders(session.user._id);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getOrder(@Param("id") id: string) {
    return this.ordersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Put(":id/pay")
  async updateOrderPayment(
    @Param("id") id: string,
    @Body() { paymentResult }: any
  ) {
    return this.ordersService.updatePaid(id, paymentResult);
  }

  @UseGuards(AdminGuard)
  @Put(":id/deliver")
  async updateOrderDelivery(@Param("id") id: string) {
    return this.ordersService.updateDelivered(id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id/observations")
  async updateObservations(
    @Param("id") id: string,
    @Body("observations") observations: string
  ) {
    return this.ordersService.updateObservations(id, observations);
  }
}
