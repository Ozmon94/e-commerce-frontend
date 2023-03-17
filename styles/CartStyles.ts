import styled from "styled-components";
const { motion } = require("framer-motion");

export const CartWrapper = styled(motion.div)`
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
  width: 40%;
  background-color: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  padding: 2rem;
  margin: 2rem 0;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled(motion.div)`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  h1 {
    font-size: 2rem;
    padding: 2rem;
  }
  svg {
    font-size: 10rem;
    color: var(--secondary);
  }
`;

export const CardQuantity = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  gap: 10px;

  button {
    background-color: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

export const CheckOut = styled(motion.div)`
  button {
    background-color: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin: 2rem 0;
    cursor: pointer;
    border: none;
  }
`;
export const Cards = styled(motion.div)``;
