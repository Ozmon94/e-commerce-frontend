import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { NavStyles, NavItems } from "@/styles/NavStyles";
import Cart from "@/components/Cart";
import User from "@/components/User";
import { useShopContext } from "@/lib/context";
import { useUser } from "@auth0/nextjs-auth0/client";

const { AnimatePresence } = require("framer-motion");

const Nav: React.FC = () => {
  const { showCart, setShowCart, totalQuantities } = useShopContext();
  const { user, error, isLoading } = useUser();

  console.log(user);
  return (
    <NavStyles>
      <Link href={`/`}>Styled</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 ? <span>{totalQuantities}</span> : null}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>

      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
};

export default Nav;
