'use client'

import { createContext, useReducer, useState } from "react";
import { Order, OrderLineItem } from "square";

export const CartContext = createContext({
  order: {
    locationId: "L18ARQTAE5CE2",
    lineItems: [],
  } as Order,
  addToCart: (lineItem: OrderLineItem) => { },
  removeFromCart: (id) => { },
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    order: {
      locationId: "L18ARQTAE5CE2",
      lineItems: [],
    } as Order
  });

  const addToCart = (lineItem: OrderLineItem) => {
    const updateOrder = [...state.order.lineItems, lineItem];

    dispatch({
      type: "ADD",
      payload: {
        items: updateOrder,
      },
    });
  };

  const removeFromCart = (id) => {
    const updatedOrder = state.order.lineItems.filter(
      (currentLineItem) => currentLineItem.id !== id
    );

    dispatch({
      type: "REMOVE",
      payload: {
        items: updatedOrder,
      },
    });
  };

  const value = {
    order: state.order,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD":
      return {
        ...state,
        order: {
          ...state.order,
          lineItems: action.payload.items,
        },
      };

    case "REMOVE":
      return {
        ...state,
        order: {
          ...state.order,
          lineItems: action.payload.items,
        },
      };

    default:
      throw new Error("No case for that type");
  }
};