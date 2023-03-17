import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import formatMoney from "@/lib/formatMoney";
const { motion } = require("framer-motion");

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

const Success: React.FC = ({ order }) => {
  const route = useRouter();
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been send to </h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h2>address</h2>
            {Object.entries(order.customer_details.address).map(
              ([key, value]) => (
                <p key={key}>
                  {key} : {value}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h2>Products</h2>
            {order.line_items.data.map((product) => (
              <div key={product.id}>
                <p>Product: {product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {formatMoney(product.price.unit_amount)} zł</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push("/")}>Continue Shopping</button>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem 15rem;
`;
const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem;

  button {
    color: white;
    background-color: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    cursor: pointer;
  }
`;

const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`;
const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  margin: 2rem 0;
`;
export default Success;
