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
        edges {
          node {
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
  }
`;

export const GET_PRODUCTS = gql`
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
