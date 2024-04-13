import { ProductType } from "../enums/ProductType";

export default interface Product {
    id: number,
    name: string,
    description: string,
    cost: number,
    type: ProductType
}