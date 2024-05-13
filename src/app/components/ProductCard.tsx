import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { CatalogObject } from 'square'
import { CartContext } from '../CartContext';

interface ProductCardProps {
    product: CatalogObject;
    imageURL: string;
}

export default function ProductCard(props: ProductCardProps) {
    const [name, setName] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>('');
    const { order, addToCart } = useContext(CartContext);

    useEffect(() => {
        setName(props.product.itemData?.name || '');
        setPrice(props.product.itemData?.variations ? Number(props.product.itemData.variations[0].itemVariationData?.priceMoney?.amount) / 100 : 0);
        setDescription(props.product.itemData?.description || '');
    }, []);

    function truncate(str: string, num: number) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

    function AddToCart() {
        const lineItem = {
            catalogObjectId: props.product.itemData?.variations?.[0].id,
            quantity: '1',
            basePriceMoney: props.product.itemData?.variations?.[0].itemVariationData?.priceMoney,
            name: name,
        }

        // Check if the item already exists in the cart
        const existingItem = order.lineItems?.find(item => item.catalogObjectId === lineItem.catalogObjectId);

        if (existingItem) {
            // If the item already exists, increment the quantity
            existingItem.quantity = (parseInt(existingItem.quantity) + 1).toString();
        } else {
            // If the item doesn't exist, add it to the cart
            addToCart(lineItem);
        }
    }

    return (
        <div className='card w-950 bg-neutral shadow-xl flex-none max-w-[20rem]'>
            <figure className="px-10 pt-10"><Image className="gap-10" src={props.imageURL} width={200} height={200} alt="cake" /></figure>
            <div className="card-body">
                <h2 className="text-2xl">{truncate(name, 25)}</h2>
                <h3 className="card-cost">{price.toFixed(2)} $</h3>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={AddToCart}>Add to Cart</button>
                </div>
            </div>
        </div >
    )
}