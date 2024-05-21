// payment.module.ts
import { Module } from '@nestjs/common';
import { NotificationController, PaymentController } from './payments-controller';
import { PaymentService } from './payments-service';
import { OrdersService } from 'src/orders/services/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/schemas/order.schema';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/services/users.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';


@Module({
  imports: [MongooseModule.forFeature([{
    name: Order.name,
    schema: OrderSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
    collection: "users"
  }
  ],
  )],
  controllers: [PaymentController, NotificationController],
  providers: [PaymentService, OrdersService, EmailService, UsersService]
})
export class PaymentModule { }
