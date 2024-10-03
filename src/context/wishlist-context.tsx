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
} from "@/features/wishlist/services/wishlistService";

type WishlistState = {
  wishlist: string[];
};

type Action =
  | { type: "LOADED_WISHLIST"; payload: string[] }
  | { type: "ADDED_ITEM"; payload: string }
  | { type: "REMOVED_ITEM"; payload: string };

type WishlistContextValueType = WishlistState & {
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValueType | null>(null);

async function loadWishlist(userId: string, dispatch: Dispatch<Action>) {
  try {
    const result = await getWishlistService(userId);
    dispatch({ type: "LOADED_WISHLIST", payload: result.productIds });
  } catch (err) {
    console.log(
      err instanceof Error
        ? err.message
        : "Erreur lors du chargement de la liste de souhaits"
    );
    dispatch({ type: "LOADED_WISHLIST", payload: [] });
  }
}

const initialState: WishlistState = {
  wishlist: [],
};

function reducer(state: WishlistState, action: Action) {
  switch (action.type) {
    case "LOADED_WISHLIST": {
      return { wishlist: action.payload };
    }

    case "ADDED_ITEM": {
      if (state.wishlist.includes(action.payload)) {
        return state;
      }
      return { wishlist: [...state.wishlist, action.payload] };
    }

    case "REMOVED_ITEM": {
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
        dispatch({ type: "ADDED_ITEM", payload: productId });
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
        dispatch({ type: "REMOVED_ITEM", payload: productId });
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
