import { Injectable } from '@nestjs/common';
import axios from "axios"
import {  ConfirmPaymenFormDTO, TokenRequestFormDto } from './dto/form.data.dto';

@Injectable()
export class PaymentService {

    async paymentTokenRequest(form: TokenRequestFormDto): Promise<any> {
        const url = 'https://developers-ventasonline.payway.com.ar/api/v2/tokens';
        const headers = {
            'Content-Type': 'application/json',
            'apikey': '96e7f0d36a0648fb9a8dcb50ac06d260',
            'X-Consumer-Username': '28464383_public',
        };
        const dataForm = {
            card_number: form.card_number,
            card_expiration_month: form.card_expiration_month,
            card_expiration_year: form.card_expiration_year,
            security_code: form.security_code,
            card_holder_name: form.card_holder_name,
            card_holder_birthday: form.card_holder_birthday,
            card_holder_door_number: form.card_holder_door_number,
            card_holder_identification: {
                type: form.card_holder_identification.type,
                number: form.card_holder_identification.number
            },
            fraud_detection: {
                device_unique_identifier: form.fraud_detection.device_unique_identifier
            }
        }
        try {
            const response = await axios.post(url, dataForm, { headers });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async confirm(form: ConfirmPaymenFormDTO): Promise<any> {
        const url = 'https://developers-ventasonline.payway.com.ar/api/v2/payments';
        const headers = {
            'Content-Type': 'application/json',
            'apikey': '92b71cf711ca41f78362a7134f87ff65',
            'X-Source': "eyJzZXJ2aWNlIjoicmVzdCIsImdyb3VwZXIiOiJwcnVlYmEiLCJkZXZlbG9wZXIiOiJwcnVlYmEifQ==",
        };
        const dataForm = {
            site_transaction_id: form.site_transaction_id,
            token: form.token,
            payment_method_id: form.payment_method_id,
            bin: form.bin,
            amount: form.amount,
            currency: form.currency,
            installments: form.installments,
            payment_type: form.payment_type,
            sub_payments: form.sub_payments
        }
        try {
            const response = await axios.post(url, dataForm, { headers });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}