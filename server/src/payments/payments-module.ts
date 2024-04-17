// payment.module.ts
import { Module } from '@nestjs/common';
import { NotificationController, PaymentController } from './payments-controller';
import { PaymentService } from './payments-service';
import { OrdersService } from 'src/orders/services/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/schemas/order.schema';




@Module({
    imports: [MongooseModule.forFeature([{
        name: Order.name,
        schema: OrderSchema,
      }])],
    controllers: [PaymentController, NotificationController],
    providers: [PaymentService,OrdersService]
})
export class PaymentModule { }
