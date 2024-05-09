'use client'

import { useState } from "react";
import { CartContext } from "../contexts";
import { CatalogObject } from "square";

export default function Context({
    children
}: {
    children: React.ReactNode
}) {
    const [cart, setCart] = useState<CatalogObject[]>([]);

    return (
        <CartContext.Provider value={cart} >
            {children}
        </CartContext.Provider>
    )
}
