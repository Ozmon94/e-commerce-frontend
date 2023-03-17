export const PRODUCT_QUERY = `
query{
  products {
    data{
      id
      attributes{
        title
        price
        description
        slug
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;

export const GET_PRODUCT_QUERY = `
query getProduct($slug: String!){
   products(filters: {slug: {eq: $slug}}){
    data{
      id
      attributes{
        title
        price
        description
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
   }
}
`;
