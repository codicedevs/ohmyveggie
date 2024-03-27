import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Zone } from '../enums/zone.enum';


@Schema()
export class ShippingDetails extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true,enum:Zone })
  city: Zone;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  timeDeliver: Date;

  /*@Prop({ required: true, enum: Zone })
  zoneDeliver: Zone;*/
}

export const ShippingDetailsSchema = SchemaFactory.createForClass(ShippingDetails);
