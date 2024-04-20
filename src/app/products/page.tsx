'use client'

import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Product from '../types/Product'
import { ProductType } from '../enums/ProductType'
import { CartContext } from '../contexts'
import Title from '../components/Title'

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const cartContext = useContext(CartContext);
    console.log(cartContext)

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const response = await fetch('https://sweet-slopes-api-05938f919785.herokuapp.com/product',
            { next: { revalidate: 10 } } // refresh cache every 10 seconds or use (cache: 'no-store')
        );
        setProducts(await response.json());
    }

    async function addToCart(product: Product) {
        cartContext.push(product)
    }

    return (
        <>

            <button className="btn" onClick={() => {
                var product: Product = {
                    id: 1,
                    name: "ASDAS",
                    description: "asdasdas",
                    cost: 12.50,
                    type: ProductType.BundtCakes
                };
                addToCart(product);

                var product: Product = {
                    id: 1,
                    name: "Other",
                    description: "Other",
                    cost: 12.50,
                    type: ProductType.Other
                };
                addToCart(product);
            }}>ADD TO CART</button>
            {cartContext.length}
            {products.length != 0 && products[0].name}

            <Title title={"Bundt Cakes"} />


            <div className="grid grid-cols-10 py-20">
                {/* Bundt Cakes */}
                {/* <text className="col-start-5 col-end-7 flex text-3xl justify-center border-t-2 border-b-2 border-stone-950 p-10 font-sans">Products</text> */}
                <div className="col-start-2 col-end-10">
                    <div className="flex flex-wrap gap-20 justify-center">
                        {cartContext.map(product => {
                            if (product.type == ProductType.BundtCakes)
                                return (<ProductCard {...product} key={product.id} />)
                        })}
                    </div>
                </div>
            </div >

            <Title title={"Other"} />
            <div className="grid grid-cols-10 pt-20">
                <div className="col-start-2 col-end-10">
                    <div className="flex flex-wrap gap-20 justify-center">
                        {cartContext.map(product => {
                            if (product.type == ProductType.Other)
                                return (<ProductCard {...product} key={product.id} />)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}