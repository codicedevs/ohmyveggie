import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { Injectable } from "@nestjs/common";
import { OrderDocument } from "src/orders/schemas/order.schema";
import { EmailService } from "src/email/email.service";
import { UsersService } from "src/users/services/users.service";
import { mercadoPagoSettings } from "src/settings";


@Injectable()
export class PaymentService {
  /**las dependencias externas no se inyectan directamente en el constructor */
  private readonly preference: Preference;
  private readonly payment: Payment;
  private readonly client: any;

  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService
  ) {
    this.client = new MercadoPagoConfig({
      accessToken:
        mercadoPagoSettings.MERCADO_PAGO_ACCESS_TOKEN,
      options: { timeout: 5000 },
    });
    this.preference = new Preference(this.client);
    this.payment = new Payment(this.client);
  }

  async createPreference(order: OrderDocument) {
    const preferenceResult = this.preference.create({
      body: {
        "back_urls": {
          "success": "https://omvrosario.com:4000",
          "failure": "https://omvrosario.com:4000",
          "pending": "https://omvrosario.com:4000"
        },
        external_reference: order._id,
        items: order.orderItems.map((item) => {
          return {
            id: item.productId,
            title: item.name,
            quantity: item.qty,
            unit_price: item.price,
          };
        }),
      },
    });
    return preferenceResult;
  }

  async getPayment(id: string) {
    const paymentResult = this.payment.get({ id });
    return paymentResult;
  }

  async sendEmailConfirmation(order: OrderDocument) {
    const orderId = order._id.toString()
    const userId = order.user.toString();
    const userToSendEmail = await this.usersService.findById(userId);
    await this.emailService.sendUserPurchaseSuccessEmail(userToSendEmail, orderId)
  }
}
