import { Controller, Post, Body, HttpException, HttpStatus, Session } from "@nestjs/common";
import { PaymentService } from "./payments-service";
import { OrderDocument } from "src/orders/schemas/order.schema";
import { NotificationData } from "src/interfaces";
import { OrdersService } from "src/orders/services/orders.service";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post("preference")
  async createPreference(@Body() order: OrderDocument) {
    try {
      const preference = await this.paymentService.createPreference(order);
      return { preference };
    } catch (error) {
      throw new HttpException('Error al crear preference', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
@Controller("notifications")
export class NotificationController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly ordersService: OrdersService
  ) { }
  /**
   *
   * @param notification esta funcion toma la notificacion, que envia mercado pago como parametro (web-hook), dentro de ella
   * se encuentra el id de la compra como external reference, con eso se actualiza el estado de la orden como pago
   * el servicio de email envia un correo indicando que la compra fue exitosa
   * @returns
   */
  @Post("mercado-pago")
  async handleNotification(@Body() notification: NotificationData,@Session() session: any) {
    try {
      const payment = await this.paymentService.getPayment(notification.data.id);
      const id = payment.external_reference;
      const orderUpdated = await this.ordersService.updatePaid(id);

      try {
        await this.paymentService.sendEmailConfirmation(orderUpdated);
      } catch (emailError) {
        console.error("Error al enviar correo de confirmación:", emailError);
      }

      return { payment };
    } catch (paymentError) {
      console.error("Error al procesar el pago:", paymentError);
      throw new HttpException('Error al procesar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

