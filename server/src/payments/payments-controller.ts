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

  /**
   * 
   * @param notification esta funcion toma la notificacion, que envia mercado pago como parametro, dentro de ella
   * se encuentra el id de la compra que mercado pago tiene registrada, dentro de esa compra esta el id de nuestra orden de sistema, 
   * la cual una vez recuperada, actualiza el estado de la mencionada orden en nuestro sistema
   * @returns 
   */
  @Post("mercado-pago")
  async handleNotification(@Body() notification: NotificationData) {
    const payment = await this.paymentService.getPayment(notification.data.id)
    if (payment) {
      const id = payment.external_reference
      const orderUpdated = await this.ordersService.updatePaid(id)
      await this.paymentService.sendEmailConfirmation(orderUpdated)
    }

    return { payment } // ver que devuelve la funcion
  }
}
