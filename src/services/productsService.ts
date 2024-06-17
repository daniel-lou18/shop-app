import { gql } from "@/lib/gql";
import { shopifyService } from "./service";

export type Product = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  vendor: string;
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type ProductsResponse = {
  products: {
    nodes: Product[];
  };
};

const query = gql`
  query ProductsQuery {
    products(first: 50) {
      nodes {
        id
        vendor
        description
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
        title
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

export async function getProducts(): Promise<FetchResult<Product[]>> {
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
