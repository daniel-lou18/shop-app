import { apiRequest } from "./apiRequest";
import { WishlistResponse } from "./Wishlist";

export const BASE_URL = "https://nest-api-qxh2.onrender.com/wishlists";

export async function getWishlistService(userId: string) {
  const url = `${BASE_URL}/${userId}`;
  return await apiRequest<WishlistResponse>(url);
}

export async function addToWishlistService(userId: string, productId: string) {
  const url = `${BASE_URL}/${userId}?productId=${productId}`;
  return await apiRequest(url, { method: "POST" });
}

export async function removeFromWishlistService(
  userId: string,
  productId: string
) {
  const url = `${BASE_URL}/${userId}?productId=${productId}`;
  return await apiRequest(url, { method: "DELETE" });
}
