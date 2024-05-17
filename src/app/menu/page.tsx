'use client'

import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Title from '../components/Title';
import { CatalogObject, OrderLineItem } from 'square';
import { getCatalogObjects } from '../actions/actions';
import { BallTriangle } from 'react-loader-spinner';
import ToggleButton from '../components/ToggleButton';

interface Catagory {
    name: string;
    id: string;
}

export default function MenuPage() {
    const [catalogObjects, setCatalogObjects] = useState<CatalogObject[]>([]);
    const [catagories, setCatagories] = useState<Catagory[]>([]);
    const [products, setProducts] = useState<CatalogObject[]>([]);
    const [images, setImages] = useState<CatalogObject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        populateStates();
    }, [catalogObjects]);

    async function getProducts() {
        setCatalogObjects(await getCatalogObjects());
        setLoading(false);
    }

    async function populateStates() {
        // Get Catagories
        setCatagories(catalogObjects.map(catalogObject => {
            if (catalogObject.type == "CATEGORY" && catalogObject.categoryData?.name != undefined)
                return { name: catalogObject.categoryData?.name, id: catalogObject.id };
        }).filter(Boolean) as Catagory[]);

        // Get Products
        setProducts(catalogObjects.map(catalogObject => {
            if (catalogObject.type == "ITEM" && catalogObject.itemData != undefined)
                return catalogObject;
        }).filter(Boolean) as CatalogObject[]);

        // Get Images
        setImages(catalogObjects.map(catalogObject => {
            if (catalogObject.type == "IMAGE" && catalogObject.imageData != undefined)
                return catalogObject;
        }).filter(Boolean) as CatalogObject[]);
    }

    return (
        <>
            {/* Spinner */}
            {loading ?
                <div className="loader-container">
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#e39898"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
                : null}


            <div className="absolute right-0 px-4">
                <ToggleButton />
            </div>

            {catagories.map(category => (
                <React.Fragment key={category.id}>
                    <Title title={category.name} />

                    <div className="grid grid-cols-10 py-20">
                        <div className="col-start-2 col-end-10">
                            <div className="flex flex-wrap gap-20 justify-center">
                                {products.map(product => {
                                    if (product.itemData?.categories?.some(cat => cat.id == category.id)) {
                                        const image = images.find(image => {
                                            return product.itemData?.imageIds && product.itemData?.imageIds.includes(image.id)
                                        });
                                        return (<ProductCard product={product} imageURL={image?.imageData?.url || ''} {...product} key={product.id} />)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </>
    )
}