export type GraphQLQueryError = { message: string };

export type ShopifyServiceResponse<T> = {
  data?: T;
  errors?: GraphQLQueryError[];
  extensions: {
    cost: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
};

export function shopifyService<T>(
  query: string
): () => Promise<ShopifyServiceResponse<T>> {
  return async function (): Promise<ShopifyServiceResponse<T>> {
    try {
      const res = await fetch(`${process.env.SHOPIFY_GRAPHQL_API_URL!}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN!,
        },
        body: JSON.stringify({ query }),
        cache: "no-store",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Une erreur est survenue. ${res.status} : ${text}`);
      }
      const result: ShopifyServiceResponse<T> = await res.json();
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((err: any) =>
          console.error("GraphQL Error", err.message)
        );
        throw new Error("Une erreur est survenue suite à une requête GraphQL");
      }
      return result;
    } catch (err) {
      console.error("Erreur ShopifiyService", err);
      throw new Error(
        "Une erreur est survenue lors de la récupération des produits"
      );
    }
  };
}
