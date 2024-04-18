import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { Injectable } from '@nestjs/common';
import { OrderDocument } from 'src/orders/schemas/order.schema';


@Injectable()
export class PaymentService {
  private readonly client: any;
  private readonly preference: Preference;
  private readonly payment: Payment

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: "TEST-6951506869962077-041109-9968d6f209a4180103b81b0d0e0d3223-1767060986", // token de usuario vendedor test
      options: { timeout: 5000 }
    });
    this.preference = new Preference(this.client);
    this.payment = new Payment(this.client);
  }

  async createPreference(order: OrderDocument) {
    try {
      const preferenceResult = this.preference.create({
        body: {
          external_reference: order._id,
          items: order.orderItems.map((item) => {
            return ({
              id: item.productId,
              title: item.name,
              quantity: item.qty,
              unit_price: item.price
            })
          })
        }
      })
      console.log(preferenceResult)
      return preferenceResult
    } catch (error) {
      console.error(error)
    }
  }
  async getPayment(id: string) {
    const paymentResult = this.payment.get({ id })
    return paymentResult
  }
}
