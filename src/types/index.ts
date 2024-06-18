export type FetchResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

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
  variants: ShopifyVariants;
};

export type ShopifyVariants = {
  nodes: ShopifyVariant[];
};

export type ShopifyVariant = {
  id: string;
  title: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  image: {
    altText: string;
    height: number;
    id: string;
    url: string;
    width: number;
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
