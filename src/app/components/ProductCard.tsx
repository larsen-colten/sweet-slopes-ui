import React from 'react'
import Image from 'next/image'
import TempImage from '../assets/image.png'



export default function ProductCard() {
    return (
        <div className='card w-96 bg-base-100 shadow-xl'>
            <figure><Image src={TempImage.src} width={96} height={96} alt="cake"/></figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div >
    )
}