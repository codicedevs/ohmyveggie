// payment.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payments.service';



@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }


  @Post("/token-request")
  async requestToken(@Body() formData: any) { // pasar a DTO
    return await this.paymentService.paymentTokenRequest(formData)
  }

  @Post('/confirm')
  async confirm(@Body() paymentData: any): Promise<any> {
    return await this.paymentService.confirm(paymentData);
  }

}
