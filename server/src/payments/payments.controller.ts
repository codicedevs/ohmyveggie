// payment.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payments.service';
import {  ConfirmPaymentDTO, TokenRequestFormDto } from './dto/form.data.dto';



@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }


  @Post("/token-request")
  async requestToken(@Body() formData: TokenRequestFormDto) { 
    return await this.paymentService.paymentTokenRequest(formData)
  }

  @Post('/confirm')
  async confirm(@Body() paymentData: ConfirmPaymentDTO): Promise<any> {
    return await this.paymentService.confirm(paymentData);
  }

}
