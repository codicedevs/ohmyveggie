import { IsEnum, IsString } from 'class-validator';
import { Zone } from 'src/orders/enums/zone.enum';

export class SaveShippingDetailsDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
  
  @IsString()
  timeDeliver: Date;

  @IsEnum(Zone)
  zoneDeliver: Zone;
}
