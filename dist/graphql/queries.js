const gql = String.raw;
export const GET_SHOP_NAME = gql `
  query getShopName {
    shop {
      name
    }
  }
`;
export const GET_PRODUCTS = gql `
  query getProducts(
    $productsFirst: Int!
    $variantsFirst: Int!
    $query: String!
  ) {
    products(first: $productsFirst, query: $query) {
      edges {
        node {
          title
          variants(first: $variantsFirst) {
            edges {
              node {
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
