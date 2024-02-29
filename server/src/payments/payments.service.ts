import { Injectable } from '@nestjs/common';
import axios from "axios"
import { FormDataDto, FormDataHandlePaymentDto } from './dto/form.data.dto';
var TokenDataModulo = require('./lib/token_data.js');
var PaymentDataModulo = require("./lib/payment_data.js")
var sdkModulo = require("./lib/sdk")

@Injectable()
export class PaymentService {
    async exampleGetToken(): Promise<any> {
        const args = {
            card_number: '4507990000004905',
            card_expiration_month: '08',
            card_expiration_year: "28",
            security_code: "775",
            card_holder_name: "John Doe",
            type: "dni",
            number: "25123456",
            apiKey: process.env.PRISMA_PUBLIC_API_KEY,
            'Content-Type': "application/json",
            'Cache-Control': "no-cache"
        };
        const tokenData = new TokenDataModulo.tokenData(args);
        const argsToSend = tokenData.getJSON();
        const response = await axios.post(process.env.PRISMA_ENDPOINT_DEVELOPER + "/tokens", argsToSend.data, { headers: argsToSend.headers })
        return response.data
    }

    async requestToken(formData: any) {
        const args = {
            card_number: formData.card_number,
            card_expiration_month: formData.card_expiration_month,
            card_expiration_year: formData.card_expiration_year,
            security_code: formData.security_code,
            card_holder_name: formData.card_holder_name,
            type: formData.type,
            number: formData.number,
            apiKey: formData.apiKey,
            'Content-Type': "application/json",
            'Cache-Control': "no-cache"
        };
        const tokenData = new TokenDataModulo.tokenData(args);
        const argsToSend = tokenData.getJSON();
        try {
            const response = await axios.post(process.env.PRISMA_ENDPOINT_DEVELOPER + "/tokens", argsToSend.data, { headers: argsToSend.headers })
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    async paymentRequest(formData: any): Promise<any> {
        const args = {
            site_transaction_id: formData.site_transaction_id,
            token: formData.token,
            user_id: formData.user_id,
            payment_method_id: formData.payment_method_id,
            bin: formData.bin,
            amount: formData.amount,
            currency: formData.currency,
            installments: formData.installments,
            description: formData.description,
            payment_type: formData.payment_type,
            sub_payments: [],
            apiKey: formData.apiKey,
            'Content-Type': 'application/json'
        }
        const sdk = await new sdkModulo.sdk(process.env.PRISMA_AMBIENTE, process.env.PRISMA_PUBLIC_API_KEY, formData.apiKey);
        const paymentData = await new PaymentDataModulo.paymentData(args);
        const paymentDataJSON = paymentData.getJSON()
        const response = await sdk.payment(paymentDataJSON, (result: any, err: any) => { console.log("result", result, "err", err) });
        return response
    }

    async confirmPayment(paymentData: any): Promise<any> {
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
    /*
        async exampleGetCardToken(user_id: string, sdk: any): Promise<string> {
            const args = {
                data: {},
                headers: {
                    "apikey": process.env.PRISMA_PRIVATE_API_KEY,
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                }
            };
            const cardTokens = await sdk.cardTokens(args, user_id)
            return cardTokens // devolver solo el token de la card en si
        }
    
        async requestTokenized(formulario: any): Promise<any> {// hacer dto de este form
            const args = {
                token: formulario.cardToken,
                security_code: formulario.security_code,
                apiKey: formulario.apiKey,
                'Content-Type': "application/json",
                'Cache-Control': "no-cache"
            };
            const tokenData = new TokenDataModulo.tokenData(args);
            const requestData = tokenData.getJSON();
            const response = await axios.post(process.env.PRISMA_ENDPOINT_DEVELOPER + "/tokens", requestData);
            console.log(response.data);
            return response.data;
        }*/
}
