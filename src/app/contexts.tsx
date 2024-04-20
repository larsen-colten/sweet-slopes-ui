import { createContext } from "react";
import Product from "./types/Product";


var cart: Product[] = [];
export const CartContext = createContext(cart);