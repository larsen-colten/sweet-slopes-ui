"use server";

import { Client, CreateOrderRequest, CreatePaymentRequest, Environment, Order, PayOrderRequest } from "square";
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

export async function createOrder(createOrderRequest: CreateOrderRequest) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/Commerce/CreateOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createOrderRequest)
        });
        if (!response.ok) {
            throw new Error('Failed to create order')
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function payOrder(orderId: string, payOrderRequest: PayOrderRequest) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/Commerce/PayOrder/${orderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payOrderRequest)
        });
        if (!response.ok) {
            throw new Error('Failed to pay order')
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getCalandarCount(date: Date) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/GoogleCalendar/calendars/${process.env.REACT_APP_CALANDAR_ID}/events/count?date=${date.toISOString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get calandar count')
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function addCalandarEvent() {

}