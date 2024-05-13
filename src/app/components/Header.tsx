'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { use, useContext, useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import { CartContext } from '../CartContext'

export default function Header() {
    const { order } = useContext(CartContext);
    const [count, setCount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setCount(order.lineItems?.length || 0);
        setTotal((Number(order.totalMoney?.amount) || 0) / 100);
    }, [order.lineItems, order.totalMoney?.amount]);

    return (
        <header>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/contact'>Products</Link></li>
                            <li><Link href='/faq'>FAQ</Link></li>
                            <li><Link href='/contact'>Contact</Link></li>
                        </ul>
                    </div>
                    <figure><Image src={Logo.src} width={100} height={100} alt="cake" /></figure>
                    <a className="btn btn-ghost text-2xl">Sweet Slopes Bakery</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className="text-lg"><Link href='/'>Home</Link></li>
                        <li className="text-lg"><Link href='/products'>Products</Link></li>
                        <li className="text-lg"><Link href='/faq'>FAQ</Link></li>
                        <li className="text-lg"><Link href='/contact'>Contact</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <Link className="indicator" href='/cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                {/* <span className="badge badge-sm indicator-item">{count}</span> */}
                            </Link>
                        </div>
                        {/* <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{count} Items</span>
                                <span className="text-info">Subtotal: {((Number(order.totalMoney?.amount) || 0) / 100).toFixed(2)}$</span>
                                <div className="card-actions">
                                    <Link className="btn btn-primary btn-block" href='/cart'>View Cart</Link>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    )
}