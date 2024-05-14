import React, { useContext, useEffect, useRef } from 'react'
import Image from 'next/image'
import { CatalogItemVariation, CatalogObject, OrderLineItem } from 'square'
import { CartContext } from '../CartContext';

interface ProductCardProps {
    product: CatalogObject;
    imageURL: string;
}

export default function ProductCard(props: ProductCardProps) {
    const [name, setName] = React.useState<string>('');
    const [price, setPrice] = React.useState<[number, number]>([0, 0]);
    const [description, setDescription] = React.useState<string>('');
    const [selectedVariation, setSelectedVariation] = React.useState<CatalogObject>();
    const [quantity, setQuantity] = React.useState<number>(1);
    const { order, addToCart } = useContext(CartContext);

    const quantityRef = useRef<HTMLDetailsElement>(null);
    const dropdownRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        setName(props.product.itemData?.name || '');
        setDescription(props.product.itemData?.description || '');

        if (props.product.itemData?.variations) {
            const prices = props.product.itemData.variations.map(variation => Number(variation.itemVariationData?.priceMoney?.amount) / 100);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPrice([minPrice, maxPrice]);
        } else {
            setPrice([0, 0]);
        }
    }, []);

    function truncate(str: string, num: number) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

    function AddToCart() {
        const lineItem: OrderLineItem = {
            catalogObjectId: selectedVariation?.id,
            quantity: quantity.toString(),
            basePriceMoney: selectedVariation?.itemVariationData?.priceMoney,
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
                <h3 className="card-cost">${price[0].toFixed(2)} - ${price[1].toFixed(2)}</h3>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => {
                        const modal = document.getElementById(`my_modal${props.product.id}`) as HTMLDialogElement;
                        if (modal) {
                            modal.showModal();
                        }
                    }}>Add to Cart</button>
                </div>
            </div>

            <dialog id={`my_modal${props.product.id}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <figure className="px-10 py-8"><Image className="gap-10" src={props.imageURL} width={400} height={400} alt="cake" /></figure>
                    <h2 className="text-2xl pb-5">{truncate(name, 50)}</h2>
                    <h3 className="card-cost">${price[0].toFixed(2)} - ${price[1].toFixed(2)}</h3>
                    <p>{description}</p>

                    <details className="dropdown dropdown-top pt-8" ref={quantityRef}>
                        <summary className="btn">Quantity</summary>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52">
                            {[...Array(10)].map((_, i) => {
                                return <li key={i} onClick={() => {
                                    setQuantity(i)
                                    const dropdown = document.querySelector('.dropdown') as HTMLDetailsElement;
                                    if (quantityRef.current) {
                                        quantityRef.current.open = false;
                                    }
                                }}><a>{i}</a></li>
                            })}
                        </ul>
                    </details>

                    <div className="flex justify-between pt-4">
                        <details className="dropdown dropdown-top" ref={dropdownRef}>
                            <summary className="btn">{selectedVariation == null ? "Choose selection" : selectedVariation.itemVariationData?.name}</summary>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                {props.product.itemData?.variations?.map(variation => {
                                    var title = variation.itemVariationData?.name + ' ' + (variation.itemVariationData?.priceMoney?.amount ? Number(variation.itemVariationData.priceMoney.amount) / 100 : 0).toFixed(2) + '$';
                                    return <li key={variation.id} onClick={() => {
                                        setSelectedVariation(variation)
                                        const dropdown = document.querySelector('.dropdown') as HTMLDetailsElement;
                                        if (dropdownRef.current) {
                                            dropdownRef.current.open = false;
                                        }
                                    }}><a>{title}</a></li>
                                })}
                            </ul>
                        </details>

                        <button className="btn btn-primary" onClick={() => {
                            AddToCart();
                            const modal = document.getElementById(`my_modal${props.product.id}`) as HTMLDialogElement;
                            if (modal) {
                                modal.close();
                            }
                        }}>Add to Cart ${((selectedVariation?.itemVariationData?.priceMoney?.amount ? Number(selectedVariation.itemVariationData.priceMoney.amount) / 100 : 0) * quantity).toFixed(2) + ' (' + quantity.toString() + ')'}</button>
                    </div>
                </div>
            </dialog>
        </div >
    )
}