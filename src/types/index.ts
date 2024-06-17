export type ShopifyProduct = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  vendor: string;
  featuredImage: {
    altText: string;
    height: number;
    id: string;
    url: string;
    width: number;
  };
  handle: string;
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type ProductsResponse = {
  products: {
    nodes: ShopifyProduct[];
  };
};

export type ShopifyExtension = {
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
