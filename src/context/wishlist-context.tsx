"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/paths";
import { ExtendedUser } from "@/auth";
import {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
} from "@/lib/services";

type WishlistState = {
  wishlist: string[];
};

type Action =
  | { type: "LOAD_WISHLIST"; payload: string[] }
  | { type: "ADD_ITEM"; payload: string }
  | { type: "REMOVE_ITEM"; payload: string };

type WishlistContextValueType = WishlistState & {
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValueType | null>(null);

async function loadWishlist(userId: string, dispatch: Dispatch<Action>) {
  try {
    const result = await getWishlistService(userId);
    dispatch({ type: "LOAD_WISHLIST", payload: result.productIds });
  } catch (err) {
    console.log(
      err instanceof Error
        ? err.message
        : "Erreur lors du chargement de la liste de souhaits"
    );
    dispatch({ type: "LOAD_WISHLIST", payload: [] });
  }
}

const initialState: WishlistState = {
  wishlist: [],
};

function reducer(state: WishlistState, action: Action) {
  switch (action.type) {
    case "LOAD_WISHLIST": {
      return { wishlist: action.payload };
    }

    case "ADD_ITEM": {
      if (state.wishlist.includes(action.payload)) {
        return state;
      }
      return { wishlist: [...state.wishlist, action.payload] };
    }

    case "REMOVE_ITEM": {
      if (!state.wishlist.includes(action.payload)) {
        return state;
      }
      return {
        wishlist: state.wishlist.filter(
          (productId) => productId !== action.payload
        ),
      };
    }
  }
}

export function WishlistContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: ExtendedUser | undefined;
}) {
  const [{ wishlist }, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  console.log({ wishlist });

  useEffect(() => {
    if (!user) return;
    loadWishlist(user.id, dispatch);
  }, [user]);

  function isSignedIn() {
    if (!user) {
      router.push(paths.customerSignIn());
      return false;
    }
    return true;
  }

  const contextValue: WishlistContextValueType = {
    wishlist,
    async addToWishlist(productId: string) {
      if (!isSignedIn()) return;
      try {
        await addToWishlistService((user as ExtendedUser).id, productId);
        dispatch({ type: "ADD_ITEM", payload: productId });
      } catch (err) {
        console.log(
          err instanceof Error
            ? err.message
            : `Erreur lors de l'ajout à la liste de souhaits`
        );
      }
    },
    async removeFromWishlist(productId: string) {
      if (!isSignedIn()) return;
      try {
        await removeFromWishlistService((user as ExtendedUser).id, productId);
        dispatch({ type: "REMOVE_ITEM", payload: productId });
      } catch (err) {
        console.log(
          err instanceof Error
            ? err.message
            : `Erreur lors de la suppression de la liste de souhaits`
        );
      }
    },
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist doit être utilisé à l'intérieur du WishlistContextProvider"
    );
  }

  return context;
}
