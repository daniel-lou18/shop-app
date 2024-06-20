import { ShopifyProduct, FetchResult, ShopifyExtension } from "@/types";
import { GET_PRODUCTS } from "../lib/queries";
import { initializeApollo } from "@/lib/apolloClient";

type GraphQLResponse = {
  products: {
    nodes: ShopifyProduct[];
  };
  extensions: ShopifyExtension;
};

export const filterMen = (product: ShopifyProduct) =>
  product.tags.includes("homme");
export const filterWomen = (product: ShopifyProduct) =>
  product.tags.includes("femme");

export async function getProducts(
  query: typeof GET_PRODUCTS,
  variables?: { [key: string]: any },
  filterFn?: (product: ShopifyProduct) => boolean
): Promise<FetchResult<ShopifyProduct[]>> {
  try {
    const apolloClient = initializeApollo();
    const result = await apolloClient.query<GraphQLResponse>({
      query,
      variables,
    });
    if (!result.data || result.data.products.nodes.length === 0) {
      throw new Error("Aucun article retrouvé");
    }
    const products = result.data.products.nodes;
    const filteredProducts = filterFn ? products.filter(filterFn) : products;
    return { success: true, data: filteredProducts };
  } catch (err) {
    let errorMessage = "Erreur lors de la récupération des produits";
    if (err instanceof Error) errorMessage = err.message;
    return {
      success: false,
      error: errorMessage,
    };
  }
}
