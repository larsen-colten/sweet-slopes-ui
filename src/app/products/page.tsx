'use client'

import React, { use, useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../contexts'
import Title from '../components/Title'
import { CatalogObject } from 'square'

interface Catagory {
    name: string;
    id: string;
}

export default function ProductsPage() {
    const [catalogObjects, setCatalogObjects] = useState<CatalogObject[]>([]);
    const [catagories, setCatagories] = useState<Catagory[]>([]);
    const [products, setProducts] = useState<CatalogObject[]>([]);
    const [images, setImages] = useState<CatalogObject[]>([]);


    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        populateStates();
    }, [catalogObjects]);

    async function getProducts() {
        const response = await fetch('https://sweet-slopes-api-0fac88cb7d8b.herokuapp.com/Commerce/GetListCatalog',
            { next: { revalidate: 10 } } // refresh cache every 10 seconds or use (cache: 'no-store')
        );
        const data = await response.json();
        console.log(data);
        setCatalogObjects(data);
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
            {catagories.map(category => (
                <>
                    <Title title={category.name} />

                    <div className="grid grid-cols-10 py-20">
                        <div className="col-start-2 col-end-10">
                            <div className="flex flex-wrap gap-20 justify-center">
                                {products.map(product => {
                                    if (product.itemData?.categories?.some(cat => cat.id == category.id)) {
                                        const image = images.find(image => {
                                            return product.itemData?.imageIds && product.itemData?.imageIds.includes(image.id)
                                        });
                                        console.log(image?.imageData?.url || '')
                                        return (<ProductCard product={product} imageURL={image?.imageData?.url || ''} {...product} key={product.id} />)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </>
    )
}