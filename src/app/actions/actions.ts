"use server";

import { Client, CreatePaymentRequest, Environment } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
    accessToken: process.env.REACT_APP_SQUARE_ACCESS_TOKEN,
    environment: process.env.NODE_ENV === "production" ? Environment.Production : Environment.Sandbox,
});

export async function submitPayment(createPaymentRequest: CreatePaymentRequest) {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: createPaymentRequest.idempotencyKey || randomUUID(),
            sourceId: createPaymentRequest.sourceId,
            amountMoney: createPaymentRequest.amountMoney,
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}