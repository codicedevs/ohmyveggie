// payment.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private readonly API_URL = 'https://api.paymentgateway.com';

  async getToken(cardNumber: string, amount: number): Promise<string> {
    // Simulando la solicitud de token a la API externa
    const response = await axios.post(`${this.API_URL}/tokens`, {
      cardNumber,
      amount,
    });
    return response.data.token;
  }

  async processPayment(token: string, amount: number): Promise<boolean> {
    // Simulando el procesamiento del pago a la API externa
    const response = await axios.post(`${this.API_URL}/payments`, {
      token,
      amount,
    });
    return response.data.success;
  }
}
