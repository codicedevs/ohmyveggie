import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({ requiered: false })
  resetKey: string

  @Prop({ requiered: false })
  resetKeyTimeStamp: string
}

export const UserSchema = SchemaFactory.createForClass(User);
