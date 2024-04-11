import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments-service';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('preference')
  async createPreference(@Body() preferenceData: any) {
    const preference = await this.paymentService.testPreference();
    return { preference };
  }
}
