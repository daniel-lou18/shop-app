"use client";

import { ShopifyVariant } from "@/types";
import { ReactNode, createContext, useContext, useReducer } from "react";

export type CartItem = ShopifyVariant & {
  orderQuantity: number;
};
export type CartState = {
  items: CartItem[];
};
type ContextValue = CartState & {
  addItem: (item: ShopifyVariant) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};
type Action =
  | {
      type: "ADD_ITEM";
      payload: ShopifyVariant;
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
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, orderQuantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      if (state.items.some((item) => item.id === action.payload)) {
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
  const [{ items }, dispatch] = useReducer(reducer, initialState);
  const contextValue: ContextValue = {
    items,
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
