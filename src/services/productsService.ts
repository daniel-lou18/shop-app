import { gql } from "@/lib/gql";
import { shopifyService } from "./services";
import { ShopifyProduct, ProductsResponse } from "@/types";

const query = gql`
  query ProductsQuery {
    products(first: 50) {
      nodes {
        id
        description
        featuredImage {
          altText
          height
          id
          url
          width
        }
        handle
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
        title
        vendor
      }
    }
  }
`;

type FetchResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

const fetchProducts = shopifyService<ProductsResponse>(query);

export async function getProducts(): Promise<FetchResult<ShopifyProduct[]>> {
  try {
    const result = await fetchProducts();
    if (
      !result.data ||
      result.data.products.nodes.length === 0 ||
      result.errors
    ) {
      throw new Error("Erreur lors de la récupération des produits");
    }
    return { success: true, data: result.data.products.nodes };
  } catch (err) {
    return {
      success: false,
      error: "Erreur lors de la récupération des produits",
    };
  }
}
