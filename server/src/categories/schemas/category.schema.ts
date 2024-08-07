import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/products/schemas/product.schema";

export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: false })
export class Category {
  @Prop({ required: true })
  name: string;
  @Prop({ required: false })
  customOption: boolean;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
  // products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
