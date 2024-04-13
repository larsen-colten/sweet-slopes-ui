import React from 'react'
import ProductCard from '../components/ProductCard'
import Product from '../types/Product'
import { ProductType } from '../enums/ProductType'

export default function productsPage() {

    let tempData: Product[] = [
        {
            id: 1,
            name: "NAME 1",
            description: "SOME DESCRIPTION",
            cost: 12.50,
            type: ProductType.bundtCakes
        },
        {
            id: 2,
            name: "NAME 2",
            description: "SOME DESCRIPTION",
            cost: 12.50,
            type: ProductType.bundtCakes
        },
        {
            id: 3,
            name: "NAME 3",
            description: "SOME DESCRIPTION",
            cost: 12.50,
            type: ProductType.bundtCakes
        },
        {
            id: 4,
            name: "NAME 4",
            description: "SOME DESCRIPTION",
            cost: 12.50,
            type: ProductType.bundtCakes
        },
        {
            id: 5,
            name: "NAME 5",
            description: "SOME DESCRIPTION",
            cost: 12.50,
            type: ProductType.bundtCakes
        },
    ]

    return (
        <>
            <h1>Bundt Cakes</h1>
            {/* Cards */}
            <div className="grid grid-cols-10">
                <div className="col-start-2 col-end-10">
                    <div className="flex flex-wrap gap-20 justify-center">
                        {
                            tempData.map(product => {
                                if (product.type == ProductType.bundtCakes)
                                    return (<ProductCard {...product} />)
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    )
}