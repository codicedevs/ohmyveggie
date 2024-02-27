export class FormDataDto {
  card_number: string;
  card_expiration_month: string;
  card_expiration_year: string;
  security_code: string;
  card_holder_name: string;
  type: string;
  number: string;
  apiKey: string;
  contentType: string;// revisar
  cacheControl: string;//revisar
}

export class FormDataHandlePaymentDto {
  site_transaction_id: string;
  token: string;
  user_id: string;
  payment_method_id: number;
  bin: string;
  amount: number;
  currency: string;
  installments: number;
  description: string;
  payment_type: string;
  apiKey: string;
  'Content-Type': string;
  transactionId: any;
  apiKeyHidden: any;
}
