'use client';

import React, { useState } from 'react'
import Title from '../components/Title'
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from '../actions/actions';
import { CreatePaymentRequest } from 'square';
import { randomUUID } from 'crypto';

export default function CartPage() {
    const [pickup, setPickup] = useState(false);
    const [firstTab, setFirstTab] = useState(true);



    return (
        <>
            <Title title={"Cart"} />


            {/* Tabs */}
            <div role="tablist" className="tabs tabs-lifted ">

                {/* Basic information */}
                <input type="radio" name="my_tabs_2" role="tab" className="tab w-80" aria-label="Order info" checked={firstTab} onClick={() => setFirstTab(true)} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-screen">Order info

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


                </div>

                {/* Review cart */}
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Payment" checked={!firstTab} onClick={() => setFirstTab(false)} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-screen">Payment

                    <PaymentForm
                        applicationId={"sandbox-sq0idb-GaJ-_gQkxXfZwSkmvRtXeA"}
                        locationId={"LW5B9GHEVEP3X"}
                        cardTokenizeResponseReceived={async (token: any) => {
                            var createPaymentRequest: CreatePaymentRequest = {
                                sourceId: token,
                                idempotencyKey: randomUUID(),
                                amountMoney: {
                                    amount: BigInt(100),
                                    currency: "USD"
                                }
                            };
                            const result = await submitPayment(createPaymentRequest);
                        }}
                    >
                        <CreditCard />
                    </PaymentForm>


                </div>

            </div>


        </>
    )
}