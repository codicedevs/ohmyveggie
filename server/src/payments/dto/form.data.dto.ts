import { Type } from 'class-transformer';
import { IsString, IsInt, IsDate, IsNumber, ValidateNested,IsObject } from 'class-validator';

class CardHolderIdentificationDto {
  @IsString()
  type: string;

  @IsString()
  number: string;
}

class FraudDetectionDto {
  @IsString()
  device_unique_identifier: string;
}

export class FormDto {
  @IsString()
  card_number: string;

  @IsString()
  card_expiration_month: string;

  @IsString()
  card_expiration_year: string;

  @IsString()
  security_code: string;

  @IsString()
  card_holder_name: string;

  @IsString()
  card_holder_birthday: string;

  @IsNumber()
  card_holder_door_number: number;


  @ValidateNested()
  @Type(() => CardHolderIdentificationDto)
  card_holder_identification: CardHolderIdentificationDto;

  @ValidateNested()
  @Type(() => FraudDetectionDto)
  fraud_detection: FraudDetectionDto;
}