export interface IProduct {
  node: {
    title: string;
    variants: {
      edges: {
        node: {
          title: string;
          price: {
            amount: number;
            currencyCode: string;
          };
        };
      }[];
    };
  };
}
