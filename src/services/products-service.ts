import { ENDPOINTS } from "@/lib/endpoints";
import { ServiceError } from "./ServiceError";
import { ProductsWithVariants } from "@/db/queries/products";

export async function getProductsService(): Promise<ProductsWithVariants> {
  try {
    const res = await fetch(ENDPOINTS.PRODUCTS);

    if (!res.ok) {
      const errorInfo = await res.json();
      throw new ServiceError(
        "Une erreur est survenue lors de la récupération des produits",
        "Fetch Error",
        res.status,
        errorInfo
      );
    }

    return (await res.json()) as ProductsWithVariants;
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof ServiceError) {
      throw err;
    }

    throw new ServiceError(
      "Une erreur inattendue est survenue",
      "Unexpected Error",
      500
    );
  }
}
