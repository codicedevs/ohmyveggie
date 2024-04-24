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

    @Prop({ required: true })
    timeDeliver: string;

    @Prop({ required: true, enum: Zone })
    zoneDeliver: Zone;
    
    @Prop({ required: false })
    stockOption: string ;// revisar, esto deberia ser un enum seguramente
}

export const shippingDetailsSchema = SchemaFactory.createForClass(ShippingDetails);

//falta agregar al backend la propiedad stockOption