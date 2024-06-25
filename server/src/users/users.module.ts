import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { UsersController } from './controller/users.controller';
import { EmailService } from 'src/email/email.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { jwtSetting } from 'src/settings';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: "users"
      },
    ],
    ),
    PassportModule,
    JwtModule.register({
      secret: jwtSetting.JWT_ACCESS_SECRET
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [UsersService, AuthService, LocalStrategy,EmailService, JwtStrategy]
})
export class UsersModule { }
