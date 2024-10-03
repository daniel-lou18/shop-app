"use client";

import { VariantWithProduct } from "@/db/queries/variants";
import { ReactNode, createContext, useContext, useReducer } from "react";

export type CartItem = VariantWithProduct & {
  orderQuantity: number;
};
export type CartState = {
  items: CartItem[];
  totalPrice: number;
};
type ContextValue = CartState & {
  addItem: (item: VariantWithProduct) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};
type Action =
  | {
      type: "ADD_ITEM";
      payload: VariantWithProduct;
    }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "CLEAR_CART";
    };

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};
const CartContext = createContext<ContextValue | null>(null);

function reducer(state: CartState, action: Action) {
  switch (action.type) {
    case "ADD_ITEM": {
      if (state.items.some((item) => item.id === action.payload.id)) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                orderQuantity: item.orderQuantity + 1,
              };
            }
            return item;
          }),
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, orderQuantity: 1 }],
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case "REMOVE_ITEM": {
      const itemIdInArray = (item: CartItem) => item.id === action.payload;
      if (state.items.some(itemIdInArray)) {
        return {
          ...state,
          items: state.items
            .map((item) => {
              if (item.id === action.payload) {
                return {
                  ...item,
                  orderQuantity: item.orderQuantity - 1,
                };
              }
              return item;
            })
            .filter((item) => item.orderQuantity > 0),
          totalPrice:
            state.totalPrice - (state.items.find(itemIdInArray)?.price || 0),
        };
      }

      return state;
    }
    case "CLEAR_CART": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [{ items, totalPrice }, dispatch] = useReducer(reducer, initialState);
  const contextValue: ContextValue = {
    items,
    totalPrice,
    addItem(item) {
      dispatch({ type: "ADD_ITEM", payload: item });
    },
    removeItem(id) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    },
    clearCart() {
      dispatch({ type: "CLEAR_CART" });
    },
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart doit être utilisé à l'intérieur du CartContextProvider"
    );
  }
  return context;
}
