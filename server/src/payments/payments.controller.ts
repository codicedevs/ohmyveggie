// payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments.service';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  
}