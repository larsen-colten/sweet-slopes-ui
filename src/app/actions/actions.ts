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
            idempotencyKey: randomUUID(),
            sourceId: createPaymentRequest.sourceId,
            amountMoney: {
                amount: createPaymentRequest.amountMoney?.amount,
                currency: "USD",
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getCatalogObjects() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/Commerce/GetListCatalog`,
            { next: { revalidate: 10 } } // refresh cache every 10 seconds or use (cache: 'no-store')
        );
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}