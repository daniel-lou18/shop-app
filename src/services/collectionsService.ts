import { ShopifyCollection, FetchResult, ShopifyExtension } from "@/types";
import { GET_COLLECTIONS } from "../lib/queries";
import { initializeApollo } from "@/lib/apolloClient";

type GraphQLResponse = {
  collections: {
    nodes: ShopifyCollection[];
  };
  extensions: ShopifyExtension;
};

export async function getCollections(
  query: typeof GET_COLLECTIONS,
  variables?: { [key: string]: any },
  filterFn?: (product: ShopifyCollection) => boolean
): Promise<FetchResult<ShopifyCollection[]>> {
  try {
    const apolloClient = initializeApollo();
    const result = await apolloClient.query<GraphQLResponse>({
      query,
      variables,
    });
    console.log(result);
    if (!result.data || result.data.collections.nodes.length === 0) {
      throw new Error("Aucun article retrouvé");
    }
    const collections = result.data.collections.nodes;
    const filteredCollections = filterFn
      ? collections.filter(filterFn)
      : collections;
    return { success: true, data: filteredCollections };
  } catch (err) {
    let errorMessage = "Erreur lors de la récupération des produits";
    if (err instanceof Error) errorMessage = err.message;
    return {
      success: false,
      error: errorMessage,
    };
  }
}
