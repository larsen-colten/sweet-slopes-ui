'use client'

import { useState } from "react";
import { CartContext } from "../contexts";
import Product from "../types/Product";

export default function Context({
    children
}: {
    children: React.ReactNode
}) {
    const [cart, setCart] = useState<Product[]>([]);

    return (
        <CartContext.Provider value={cart} >
            {children}
        </CartContext.Provider>
    )
}
