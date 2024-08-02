type WishlistResponse = { id: number; userId: string; productIds: string[] };

const BASE_URL = "http://localhost:3000/wishlists";

export async function getWishlistService(
  userId: string
): Promise<WishlistResponse> {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status} - ${response.statusText}. ${data?.message}`
      );
    }

    return data as WishlistResponse;
  } catch (err: unknown) {
    console.error(err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Une erreur est survenue lors de la récupération de la liste de souhaits"
    );
  }
}

export async function addToWishlistService(userId: string, productId: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/${userId}?productId=${productId}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status} - ${response.statusText}. ${data?.message}`
      );
    }

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Une erreur est survenue lors de l'ajout à la liste de souhaits"
    );
  }
}

export async function removeFromWishlistService(
  userId: string,
  productId: string
) {
  try {
    const response = await fetch(
      `${BASE_URL}/${userId}?productId=${productId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status} - ${response.statusText}. ${data?.message}`
      );
    }

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Une erreur est survenue lors de la suppression du produit de la liste de souhaits"
    );
  }
}
