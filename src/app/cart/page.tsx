'use client';

import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { createOrder, payOrder, submitPayment } from '../actions/actions';
import { CreatePaymentRequest, PayOrderRequest } from 'square';
import { randomUUID } from 'crypto';
import { CartContext } from '../CartContext';

enum Pages {
    BasicInfo,
    Review
}

export default function CartPage() {
    const [pickup, setPickup] = useState(false);
    const [firstTab, setFirstTab] = useState(true);
    const { order } = useContext(CartContext);
    const [page, setPage] = useState(Pages.BasicInfo);

    async function pay(token: any) {
        var createPaymentRequest: CreatePaymentRequest = {
            sourceId: token.token,
            idempotencyKey: "",
            amountMoney: {
                amount: BigInt(100),
                currency: "USD"
            }
        };
        const resultSubmitPayment = await submitPayment(createPaymentRequest);
        console.log(resultSubmitPayment);

        if (resultSubmitPayment) {
            var createOrderRequest = {
                order: order,
                idempotencyKey: "",
            }
            const resultCreateOrder = await createOrder(createOrderRequest);
            console.log(resultCreateOrder);

            if (resultCreateOrder) {
                var payOrderRequest: PayOrderRequest = {
                    idempotencyKey: "",
                    paymentIds: [resultSubmitPayment.payment?.id || '']
                }

                const resultPayOrder = await payOrder(resultCreateOrder.id, payOrderRequest);
                if (resultPayOrder) {
                    console.log(resultPayOrder);
                    console.log('Payment successful');
                }
            }

        }
    }

    return (
        <>
            <Title title={"Cart"} />

            {order.lineItems?.map((item, index) => {
                return (
                    <div key={index} className="card bg-base-100 shadow-xl w-950">
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p>{item.quantity}</p>
                        </div>
                    </div>
                )
            })}

            {/* Basic information */}
            {page == Pages.BasicInfo &&
                <>
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <label className='input input-bordered flex items-center gap-2'>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                        <input type="text" className="grow" placeholder="sweetslopes@gmail.com" />
                    </label>

                    {(pickup == false) &&
                        <>
                            <label>
                                Deliver to
                            </label>


                            {/* Address */}
                            <div className="label">
                                <span className="label-text">Adderess</span>
                            </div>
                            <label className='input input-bordered flex items-center gap-2'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                <input type="text" className="grow" placeholder="123 N ABC W" />
                            </label>

                            {/* Address 2 */}
                            <div className="label">
                                <span className="label-text">Address 2</span>
                            </div>
                            <label className='input input-bordered flex items-center gap-2'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                <input type="text" className="grow" placeholder="Apt 101" />
                            </label>

                            {/* City */}
                            <div className="label">
                                <span className="label-text">City</span>
                            </div>
                            <label className='input input-bordered flex items-center gap-2'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                <input type="text" className="grow" placeholder="Lehi" />
                            </label>

                            {/* Zip */}
                            <div className="label">
                                <span className="label-text">Zip</span>
                            </div>
                            <label className='input input-bordered flex items-center gap-2'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                <input type="text" className="grow" placeholder="84043" />
                            </label>


                        </>
                    }

                    <button className="btn btn-primary" onClick={() => setPage(Pages.Review)}>Review</button>
                </>
            }

            {/* Review cart */}
            {page == Pages.Review &&
                <>
                    <PaymentForm
                        applicationId={"sandbox-sq0idb-GaJ-_gQkxXfZwSkmvRtXeA"}
                        locationId={"L18ARQTAE5CE2"}
                        cardTokenizeResponseReceived={async (token: any) => {
                            pay(token);
                        }}
                    >
                        <CreditCard />
                    </PaymentForm>
                </>
            }
        </>
    )
}