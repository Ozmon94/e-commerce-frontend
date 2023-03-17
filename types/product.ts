export interface IProduct {
  id: number;
  attributes: {
    title: string;
    price: number;
    description: string;
    slug: string;
    image: {
      data: {
        attributes: {
          formats: {
            large: {
              url: string;
            };
            medium: { url: string };
            small: { url: string };
            thumbnail: { url: string };
          };
        };
      };
    };
  };
}
