import { Injectable } from '@nestjs/common';
import axios from "axios"
import { FormDto } from './dto/form.data.dto';
var sdkModulo = require("./lib/sdk")

@Injectable()
export class PaymentService {

    async paymentTokenRequest(form: FormDto): Promise<any> {
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

    async confirm(paymentData: any): Promise<any> {
        const stringDatos = paymentData.stringDatos;
        const data = JSON.parse(stringDatos);
        const paymentId = data.paymentId;
        const args = {
            data: {
                amount: parseInt(data.amount)
            },
            headers: {
                apikey: data.apiKeyHidden,
                'Content-Type': 'application/json',
                'Cache-Control': ''
            }
        };
        const sdk = await new sdkModulo.sdk('developer', process.env.PRISMA_PUBLIC_API_KEY, data.apiKeyHidden);
        const paymentResult = await sdk.payment(args, paymentId);
        return paymentResult

    }

}
