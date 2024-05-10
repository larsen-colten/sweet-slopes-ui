import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import TempImage from '../assets/image.png'
import { CatalogObject } from 'square'
// import { CartContext } from '../contexts';

interface ProductCardProps {
    product: CatalogObject;
    imageURL: string;
}

export default function ProductCard(props: ProductCardProps) {
    const [name, setName] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>('');

    useEffect(() => {
        setName(props.product.itemData?.name || '');
        setPrice(props.product.itemData?.variations ? Number(props.product.itemData.variations[0].itemVariationData?.priceMoney?.amount) / 100 : 0);
        setDescription(props.product.itemData?.description || '');
    }, []);

    return (
        <div className='card w-950 bg-neutral shadow-xl flex-none'>
            <figure className="px-10 pt-10"><Image className="gap-10" src={props.imageURL} width={200} height={200} alt="cake" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <h3 className="card-cost">{price.toFixed(2)} $</h3>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div >
    )
}