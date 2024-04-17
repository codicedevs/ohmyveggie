import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments-service';
import { OrderDocument } from 'src/orders/schemas/order.schema';
import { NotificationData } from 'src/interfaces';
import { OrdersService } from 'src/orders/services/orders.service';



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
  constructor(private readonly paymentService: PaymentService, private readonly ordersService: OrdersService) { }


  @Post("mercado-pago")
  async handleNotification(@Body() notification: NotificationData) {
    const payment = await this.paymentService.getPayment(notification.data.id)
    if (payment) {
      const id = payment.external_reference
      this.ordersService.updatePaid(id)
    }
    console.log("webhook-recibed", notification)
    console.log("payment", payment)
  }
}
