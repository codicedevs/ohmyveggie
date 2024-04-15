import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments-service';
import { OrderDocument } from 'src/orders/schemas/order.schema';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('preference')
  async createPreference(@Body() order: OrderDocument) {
    const preference = await this.paymentService.createPreference(order);
    return { preference };
  }
}
@Controller("notifications")
export class NotificationController {
  constructor() { }

  @Post("mercado-pago")
  async handleNotification(@Body() notification: any) {// tipar como mercadopago notification
    console.log("webhook-recibed", notification)
  }
}