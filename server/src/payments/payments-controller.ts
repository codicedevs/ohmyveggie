import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
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
   * @param notification esta funcion toma la notificacion, que envia mercado pago como parametro, dentro de ella
   * se encuentra el id de la compra que mercado pago tiene registrada, dentro de esa compra esta el id de nuestra orden de sistema,
   * la cual una vez recuperada, actualiza el estado de la mencionada orden en nuestro sistema
   * @returns
   */
  @Post("mercado-pago")
  async handleNotification(@Body() notification: NotificationData) {
    try {
      // Obtener información de pago
      const payment = await this.paymentService.getPayment(notification.data.id);
      const id = payment.external_reference;
      // Actualizar estado del pedido
      const orderUpdated = await this.ordersService.updatePaid(id);
      // Enviar correo de confirmación
      try {
        await this.paymentService.sendEmailConfirmation(orderUpdated);
      } catch (emailError) {
        console.error("Error al enviar correo de confirmación:", emailError);
      }
      // Respuesta exitosa
      return { payment };
    } catch (paymentError) {
      console.error("Error al procesar el pago:", paymentError);
      // Lanzar un error HTTP indicando que el flujo de pago no se ha completado
      throw new HttpException('Error al procesar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

