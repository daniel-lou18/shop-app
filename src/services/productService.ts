import {
  ShopifyProduct,
  FetchResult,
  ShopifyExtension,
  ShopifyVariants,
} from "@/types";
import { GET_PRODUCT } from "../lib/queries";
import { initializeApollo } from "@/lib/apolloClient";

type GraphQLResponse = {
  product: ShopifyProduct;
  extensions: ShopifyExtension;
  variants: ShopifyVariants;
};

const getVariables = (id: string) => {
  return {
    id: `gid://shopify/Product/${id}`,
  };
};

export async function getProduct(
  id: string
): Promise<FetchResult<ShopifyProduct>> {
  const apolloClient = initializeApollo();
  try {
    const result = await apolloClient.query<GraphQLResponse>({
      query: GET_PRODUCT,
      variables: getVariables(id),
    });
    if (!result.data || !result.data.product)
      throw new Error("Nous n'avons pas retrouvé l'article");
    return { success: true, data: result.data.product };
  } catch (err) {
    let errorMessage = "Erreur lors de la récupération de l'article";
    if (err instanceof Error) errorMessage = err.message;
    return {
      success: false,
      error: errorMessage,
    };
  }
}
