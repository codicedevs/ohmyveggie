import { IsEnum, IsString } from 'class-validator';
import { stockOption } from 'src/orders/enums/stock.option';
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
  timeDeliver: string;

  @IsEnum(Zone)
  zoneDeliver: Zone;

  @IsEnum(stockOption)
  stockOption: stockOption
}
