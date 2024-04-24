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

    @Prop({ required: false })
    timeDeliver: string;

    @Prop({ required: false, enum: Zone })
    zoneDeliver: Zone;
    
    @Prop({ required: false })
    stockOption: string ;
}

export const shippingDetailsSchema = SchemaFactory.createForClass(ShippingDetails);

//falta agregar al backend la propiedad stockOption