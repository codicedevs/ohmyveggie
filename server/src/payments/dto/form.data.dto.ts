import { Type } from 'class-transformer';
import { IsString, IsNumber, ValidateNested, IsArray } from 'class-validator';

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

export class TokenRequestFormDto {
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

export class ConfirmPaymentDTO {
  @IsString()
  site_transaction_id: string;

  @IsString()
  token: string;

  @IsNumber()
  payment_method_id: number;

  @IsString()
  bin: string

  @IsNumber()
  amount: number

  @IsString()
  currency: string

  @IsNumber()
  installments: number

  @IsString()
  payment_type: string

  @IsArray()
  sub_payments: string[]

}