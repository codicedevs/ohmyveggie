// payment.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { FormDataDto, FormDataHandlePaymentDto } from './dto/form.data.dto';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get("/get-token")
  async getToken() {
    return await this.paymentService.getToken();
  }

  @Get("/partial-refaund")
  async getPartialRefaund() {
    return await this.paymentService.partialRefaund()
  }

  @Get("/total-refaund")
  async getTotalRefaund() {
    return await this.paymentService.totalRefaund()
  }

  @Post("/request-token")
  async requestToken(@Body() formData: FormDataDto) {
    return await this.paymentService.requestToken(formData)
  }
  @Post('/request-payment')
  async handlePaymentRequest(@Body() formData: FormDataHandlePaymentDto): Promise<any> {
    return await this.paymentService.paymentRequest(formData);
  }
  @Post('/confirm-payment')
  async confirmPayment(@Body() paymentData: any): Promise<any> {
    return await this.paymentService.confirmPayment(paymentData);
  }
}