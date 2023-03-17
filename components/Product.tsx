import React from "react";
import { StyledImage, StyledProduct } from "@/styles/ProductStyle";
import Link from "next/link";
import { IProduct } from "@/types/product";

type ProductProps = {
  product: IProduct;
};
const Product: React.FC<ProductProps> = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  console.log(image);
  return (
    <StyledProduct>
      <Link href={`/products/${slug}`}>
        <div>
          <StyledImage
            src={image.data.attributes.formats.small?.url}
            alt={title}
          />{" "}
        </div>{" "}
      </Link>
      <h2>{title}</h2>
      <h3>Cena: {price} zł</h3>
    </StyledProduct>
  );
};

export default Product;
