'use client';

import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { createOrder, payOrder, submitPayment } from '../actions/actions';
import { CreateOrderRequest, CreatePaymentRequest, PayOrderRequest } from 'square';
import { CartContext } from '../CartContext';

enum Pages {
    BasicInfo,
    Review
}

export default function CartPage() {
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const { order } = useContext(CartContext);
    const [page, setPage] = useState(Pages.BasicInfo);

    async function pay(token: any) {
        var createPaymentRequest: CreatePaymentRequest = {
            sourceId: token.token,
            idempotencyKey: "",
            amountMoney: {
                amount: BigInt(order.totalMoney?.amount || 0),
                currency: "USD"
            }
        };
        const resultSubmitPayment = await submitPayment(createPaymentRequest);

        if (resultSubmitPayment) {
            order.fulfillments = [{
                deliveryDetails: {
                    recipient: {
                        address: {
                            addressLine1: address1,
                            addressLine2: address2,
                            locality: city,
                            administrativeDistrictLevel1: state,
                            postalCode: zip
                        },
                        displayName: email
                    }
                }
            }];

            var createOrderRequest: CreateOrderRequest = {
                order: order,
                idempotencyKey: "",
            }
            const resultCreateOrder = await createOrder(createOrderRequest);

            if (resultCreateOrder) {
                var payOrderRequest: PayOrderRequest = {
                    idempotencyKey: "",
                    paymentIds: [resultSubmitPayment.payment?.id || '']
                }

                const resultPayOrder = await payOrder(resultCreateOrder.id, payOrderRequest);
                if (resultPayOrder) {
                    console.log('Payment successful');
                }
            }
        }
    }

    return (
        <>
            <Title title={"Cart"} />

            {/* Basic information */}
            <div className="grid grid-cols-10 py-20">
                <div className="col-start-3 col-end-9 bg-white p-10 rounded-3xl">
                    <div className=''>
                        {page == Pages.BasicInfo &&
                            <>
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <label className='input input-bordered flex items-center gap-2 bg-white'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                    <input type="text"
                                        className="grow"
                                        placeholder="sweetslopes@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>

                                {/* Address */}
                                <div className="label">
                                    <span className="label-text">Adderess 1</span>
                                </div>
                                <label className='input input-bordered flex items-center gap-2 bg-white'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="123 N ABC W"
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </label>

                                {/* Address 2 */}
                                <div className="label">
                                    <span className="label-text">Address 2</span>
                                </div>
                                <label className='input input-bordered flex items-center gap-2 bg-white'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                    <input type="text"
                                        className="grow"
                                        placeholder="Apt 101"
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </label>

                                {/* City */}
                                <div className="label">
                                    <span className="label-text">City</span>
                                </div>
                                <label className='input input-bordered flex items-center gap-2 bg-white'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Lehi"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </label>

                                {/* State */}
                                <div className="label">
                                    <span className="label-text">State</span>
                                </div>
                                <label className='input input-bordered flex items-center gap-2 bg-white'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="UT"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </label>

                                {/* Zip */}
                                <div className="label">
                                    <span className="label-text">Zip</span>
                                </div>
                                <label className='input input-bordered flex items-center gap-2 bg-white'>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="84043"
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                    />
                                </label>

                                <button className="btn btn-primary mt-6" onClick={() => setPage(Pages.Review)}>Review</button>
                            </>
                        }

                        {/* Review cart */}
                        {page == Pages.Review &&
                            <>
                                <div className="overflow-x-auto p-5">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.lineItems?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{(((Number(item.basePriceMoney?.amount) || 0) / 100) * +item.quantity).toFixed(2)}${ }</td>
                                                        <td>{item.quantity}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>



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
                    </div>
                </div>
            </div >
        </>
    )
}