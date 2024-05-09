import { createContext } from "react";
import { CatalogObject } from "square";


var cart: CatalogObject[] = [];
export const CartContext = createContext(cart);