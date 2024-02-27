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

  @Get("/partialRefaund")
  async getPartialRefaund() {
    return await this.paymentService.partialRefaund()
  }

  @Get("/totalRefaund")
  async getTotalRefaund() {
    return await this.paymentService.totalRefaund()
  }

  @Post("/requestToken")
  async requestToken(formData: FormDataDto) {
    return await this.paymentService.requestToken(formData)
  }
  @Post('/requestPayment')
  async handlePaymentRequest(@Body() formData: FormDataHandlePaymentDto): Promise<any> {
    return await this.paymentService.handlePaymentRequest(formData);
  }
  @Post('/confirmPayment')
  async confirmPayment(@Body() paymentData: any): Promise<any> {
    return await this.paymentService.confirmPayment(paymentData);
  }
}