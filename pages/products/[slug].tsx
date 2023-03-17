import React, { useEffect } from "react";
import { GET_PRODUCT_QUERY } from "@/lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import {
  SingleProductStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "@/styles/SingleProductStyle";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useShopContext } from "@/lib/context";
import toast from "react-hot-toast";

const SingleProduct = () => {
  //Fetch Route
  const { query } = useRouter();
  // Context
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useShopContext();
  //Reset quantity
  useEffect(() => {
    setQty(1);
  }, []);
  //Fetch Graphql Data

  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const { title, description, image } = data.products.data[0].attributes;
  //Create a toast
  const notify = () => {
    toast(`${title} added to your cart`, { duration: 1500 });
  };
  return (
    <SingleProductStyle>
      <img src={image.data.attributes.formats.small.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={() => decreaseQty()}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={() => increaseQty()}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0], qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </SingleProductStyle>
  );
};

export default SingleProduct;
