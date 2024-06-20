import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query SingleProductQuery($id: ID!) {
    product(id: $id) {
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
      variants(first: 10) {
        nodes {
          id
          title
          selectedOptions {
            name
            value
          }
          price
          availableForSale
          sku
          weight
          weightUnit
          image {
            altText
            height
            id
            url
            width
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query ProductsQuery($query: String) {
    products(first: 50, query: $query) {
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

export const SEARCH_PRODUCTS = gql`
  query searchProducts($query: String!) {
    search(query: $query, first: 50, types: PRODUCT) {
      edges {
        node {
          ... on Product {
            id
            title
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query CollectionsQuery {
    collections(first: 5) {
      nodes {
        id
        products(first: 5) {
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
    }
  }
`;

export const GET_PRODUCTS_BY_COLLECTION = gql`
  query AllProducts {
    collection(handle: "filterable-collection") {
      handle
      products(first: 10) {
        edges {
          node {
            handle
          }
        }
      }
    }
  }
`;
