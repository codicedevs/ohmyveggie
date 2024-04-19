import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Zone } from '../enums/zone.enum';


@Schema()
export class ShippingDetails extends Document {
    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    postalCode: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: false })// solo esta en false para no romper con el flujo de la venta, debe agregarse a la orden
    timeDeliver: Date;

    @Prop({ required: false, enum: Zone })// solo esta en false para no romper con el flujo de la venta, debe agregarse a la orden
    zoneDeliver: Zone;
}

export const shippingDetailsSchema = SchemaFactory.createForClass(ShippingDetails);
