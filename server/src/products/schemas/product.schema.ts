import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UUID } from "crypto";
import { Category } from "src/categories/schemas/category.schema";

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] })
  categories: Category[];

  @Prop({ require: false })
  image: string;

  @Prop({ require: false })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  countInStock: number;

  @Prop({ required: true, default: 0 })
  externalId: UUID;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
