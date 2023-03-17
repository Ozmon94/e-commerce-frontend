import React from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import formatMoney from "@/lib/formatMoney";
import {loadStripe} from "@stripe/stripe-js";
import type { GetServerSideProps } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,{
    apiVersion: '2022-11-15',
  }
);

type ProfileProps = {
  user:{name:string,email:string},
  orders:{id:number}
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {

    const session = await getSession(ctx.req, ctx.res);

    if (!session || typeof session === 'undefined' ) return {props:{user:{},orders:{}}}
    const stripeId = session.user[`${process.env.NEXT_PUBLIC_BASE_URL}`];

    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    console.log(stripe);
    return { props: { user: session.user ,orders: {} } };
  },
});

const Profile: React.FC<ProfileProps> = ({ user, orders }) => {
  const route = useRouter();
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {/*{orders.map((order) => (*/}
          {/*  <Order key={order.id}>*/}
          {/*    <h1>Order Number: {order.id}</h1>*/}
          {/*    <h2>Amount: {formatMoney(order.amount)} zł</h2>*/}
          {/*    <h2>Receipt Email: {user.email}</h2>*/}
          {/*  </Order>*/}
          {/*))}*/}
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
