import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })


@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ require: true })
  image: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  countInStock: number;

  @Prop({ required: true, default: 0 })
  externalId: UUID;
 
}

export const ProductSchema = SchemaFactory.createForClass(Product);
