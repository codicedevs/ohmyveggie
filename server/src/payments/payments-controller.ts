import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments-service';
import { OrderDocument } from 'src/orders/schemas/order.schema';
import { NotificationType } from 'src/interfaces';


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
  constructor() {}

  @Post("mercado-pago")
  async handleNotification(@Body() notification: NotificationType) {
    console.log("webhook-recibed", notification)
  }
}
