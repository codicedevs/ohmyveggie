import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";
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

  @Prop({ required: true, default: uuidv4 })
  externalId: string;

  @Prop({ required: false, default: false })
  activo: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
