import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Zone } from '../enums/zone.enum';
import { stockOption } from '../enums/stock.option';
import { timeDeliver } from '../enums/time.deliver';


@Schema()
export class ShippingDetails extends Document {
    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    postalCode: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true, enum: timeDeliver })
    timeDeliver: timeDeliver;

    @Prop({ required: true, enum: Zone })
    zoneDeliver: Zone;

    @Prop({ required: true, enum: stockOption })
    stockOption: stockOption;
}

export const shippingDetailsSchema = SchemaFactory.createForClass(ShippingDetails);
