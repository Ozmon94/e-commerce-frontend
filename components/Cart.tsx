import React from "react";
import { useShopContext } from "@/lib/context";
import { FiShoppingBag } from "react-icons/fi";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  CardQuantity,
  CheckOut,
  Cards,
} from "@/styles/CartStyles";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import getStripe from "@/lib/stripe";

//Animation variants

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Cart: React.FC = () => {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useShopContext();

  //Fetching Stripe
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();
    await stripe?.redirectToCheckout({ sessionId: data?.id });
  };

  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1>You have more shopping to do</h1>
            <FiShoppingBag />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card layout variants={card} key={item.id}>
                  <img
                    src={
                      item.attributes.image.data.attributes.formats.thumbnail
                        .url
                    }
                    alt={item.attributes.title}
                  />
                  <CardInfo>
                    <h3>{item.attributes.title}</h3>
                    <h3>{item.attributes.price} zł</h3>
                    <CardQuantity>
                      <span>Quantity</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </CardQuantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <CheckOut layout>
            <h3>Subtotal: {totalPrice.toFixed(2)}</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </CheckOut>
        )}
      </CartStyle>
    </CartWrapper>
  );
};

export default Cart;
