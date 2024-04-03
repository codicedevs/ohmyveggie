import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrdersService } from '../services/orders.service';
import { Order } from '../schemas/order.schema';
import { DateRange } from 'src/interfaces';


@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: any, @Session() session: any) {
    return this.ordersService.create(body, session.user._id);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getOrders() {
    return this.ordersService.findAll();
  }

  /* @UseGuards(AdminGuard)  este endpoint es el que debe usarse
  esta comentado a los efectos de no romper el frontend actual
    @Get()
    getPaginatedOrders(
      @Query('pageId') pageId: string
    ) {
      return this.ordersService.findMany(pageId);
    }*/

  @UseGuards(AdminGuard)
  @Get('/find-by-day')
  async findByDay(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<Order[]> {
    const dateRange: DateRange = { startDate, endDate };
    const orders = await this.ordersService.findByDay(dateRange);
    return orders;
  }

  @UseGuards(AuthGuard)
  @Get('myorders')
  async getUserOrders(@Session() session: any) {
    return this.ordersService.findUserOrders(session.user._id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id/pay')
  async updateOrderPayment(
    @Param('id') id: string,
    @Body() { paymentResult }: any
  ) {
    return this.ordersService.updatePaid(id, paymentResult);
  }

  @UseGuards(AdminGuard)
  @Put(':id/deliver')
  async updateOrderDelivery(@Param('id') id: string) {
    return this.ordersService.updateDelivered(id);
  }
}
