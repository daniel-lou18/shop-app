jest.mock("../apiRequest");

import { apiRequest } from "../apiRequest";
import { WishlistResponse } from "../Wishlist";
import { BASE_URL, getWishlistService } from "../wishlistService";

const mockWishlist: WishlistResponse = {
  id: 1,
  userId: "xfd",
  productIds: ["f5qf5"],
};

describe("getWishlistService function", () => {
  test("fetches wishlist successfully", async () => {
    (apiRequest as jest.Mock).mockResolvedValue(mockWishlist);

    const result = await getWishlistService(mockWishlist.userId);

    expect(result).toEqual(mockWishlist);
    expect(apiRequest).toHaveBeenCalledWith(
      `${BASE_URL}/${mockWishlist.userId}`
    );
  });

  test("throws error if request fails", async () => {
    (apiRequest as jest.Mock).mockRejectedValue(
      new Error(`Erreur HTTP : 404 - Not found`)
    );

    await expect(getWishlistService(mockWishlist.userId)).rejects.toThrow(
      "Erreur HTTP : 404 - Not found"
    );
  });
});
