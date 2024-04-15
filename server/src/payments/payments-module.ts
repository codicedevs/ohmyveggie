// payment.module.ts
import { Module } from '@nestjs/common';
import { NotificationController, PaymentController } from './payments-controller';
import { PaymentService } from './payments-service';


@Module({
    controllers: [PaymentController,NotificationController],
    providers: [PaymentService],
})
export class PaymentModule { }
