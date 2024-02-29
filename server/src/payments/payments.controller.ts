// payment.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { FormDataDto, FormDataHandlePaymentDto } from './dto/form.data.dto';
import sdk from './lib/sdk';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get("/get-example-token")
  async getToken() {
    return await this.paymentService.exampleGetToken();
  }
  @Post("/request-token")
  async requestToken(@Body() formData: any) {
    return await this.paymentService.requestToken(formData)
  }
  @Post('/request-payment')
  async handlePaymentRequest(@Body() formData: any): Promise<any> {
    return await this.paymentService.paymentRequest(formData);
  }
  @Post('/confirm-payment')
  async confirmPayment(@Body() paymentData: any): Promise<any> {
    return await this.paymentService.confirmPayment(paymentData);
  }
  /*
  @Get(':user_id')
  async getCardToken(@Param('user_id') userId: string): Promise<string> {
    const token = await this.paymentService.exampleGetCardToken(userId, sdk);
    return token;
  }
  @Post('request-tokenized')
  async requestTokenized(@Body() formData: any): Promise<any> {
    const response = await this.paymentService.requestTokenized(formData);
    return response;
  }
  */
}
