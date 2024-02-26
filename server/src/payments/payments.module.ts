// payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentController } from './payments.controller';


@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
