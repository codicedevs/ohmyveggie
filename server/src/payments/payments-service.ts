import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { Injectable } from "@nestjs/common";
import { OrderDocument } from "src/orders/schemas/order.schema";
import { EmailService } from "src/email/email.service";
import { OrdersService } from "src/orders/services/orders.service";
import { UsersService } from "src/users/services/users.service";
import { UserDocument } from "src/users/schemas/user.schema";

@Injectable()
export class PaymentService {
  /**las dependencias externas no se inyectan directamente en el constructor */
  private readonly preference: Preference;
  private readonly payment: Payment;
  private readonly client: any;

  constructor(
    private readonly emailService: EmailService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService
  ) {
    this.client = new MercadoPagoConfig({
      accessToken:
        "TEST-6951506869962077-041109-9968d6f209a4180103b81b0d0e0d3223-1767060986", // token de usuario vendedor test
      options: { timeout: 5000 },
    });
    this.preference = new Preference(this.client);
    this.payment = new Payment(this.client);
  }

  async createPreference(order: OrderDocument) {
    const preferenceResult = this.preference.create({
      body: {
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
    console.log(preferenceResult);
    return preferenceResult;
  }

  async getPayment(id: string) {
    const paymentResult = this.payment.get({ id });
    return paymentResult;
  }

  async sendEmailConfirmation(order: OrderDocument) {
    const orderId = order._id
    const userId = order.user.toString();
    const userToSendEmail = await this.usersService.findById(userId);
    await this.emailService.sendUserPurchaseSuccessEmail(userToSendEmail,orderId)
  }
}
