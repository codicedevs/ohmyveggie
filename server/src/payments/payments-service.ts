import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Body, Injectable } from '@nestjs/common';
import { OrderItem } from 'src/interfaces';


@Injectable()
export class PaymentService {
  private readonly client: any;
  private readonly preference: any;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: "TEST-6951506869962077-041109-9968d6f209a4180103b81b0d0e0d3223-1767060986", // token de usuario vendedor test
      options: { timeout: 5000 }
    });
    this.preference = new Preference(this.client);
  }

  async testPreference() {

    this.preference.create({
      body: {
        items: [
          {
            id: '<ID>',
            title: '<title>',
            quantity: 1,
            unit_price: 12.34
          }
        ]
      }
    }).then(console.log).catch(console.log);
  }


}
