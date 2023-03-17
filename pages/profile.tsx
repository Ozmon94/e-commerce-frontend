import React from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import formatMoney from "@/lib/formatMoney";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.NEXT_PUBLIC_BASE_URL}`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return { props: { orders: paymentIntents.data } };
  },
});

const Profile: React.FC = ({ user, orders }) => {
  const route = useRouter();
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <Order>
              <h1>Order Number: {order.id}</h1>
              <h2>Amount: {formatMoney(order.amount)} zł</h2>
              <h2>Receipt Email: {user.email}</h2>
            </Order>
          ))}
        </div>
        <button onClick={() => route.push("/api/auth/logout")}>Logout</button>
      </div>
    )
  );
};
const Order = styled.div`
  background-color: white;
  margin: 2rem 0;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 1rem;
  }
`;

export default Profile;
