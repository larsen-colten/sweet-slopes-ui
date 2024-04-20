import React, { useContext } from 'react'
import Image from 'next/image'
import TempImage from '../assets/image.png'
import Product from '../types/Product'
// import { CartContext } from '../contexts';

export default function ProductCard(product: Product) {
    // let cart = useContext(CartContext);


    function AddToCart(product: Product) {

    }

    return (
        <div className='card w-950 bg-neutral shadow-xl flex-none'>
            <figure className="px-10 pt-10"><Image className="gap-10" src={TempImage.src} width={200} height={200} alt="cake" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <h3 className="card-cost">{product.cost.toFixed(2)} $</h3>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div >
    )
}