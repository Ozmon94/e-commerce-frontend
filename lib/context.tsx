import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";
import { IProduct } from "@/types/product";

type StateContextProps = { children: ReactNode };
type extendedProduct = IProduct & { quantity: number };

type ContextProps = {
  qty: number;
  setQty: Dispatch<number>;
  increaseQty: () => void;
  decreaseQty: () => void;
  showCart: boolean;
  setShowCart: Dispatch<boolean>;
  cartItems: extendedProduct[];
  onAdd: (product: IProduct, quantity: number) => void;
  onRemove: (product: IProduct) => void;
  totalQuantities: number;
  totalPrice: number;
};

const ShopContext = createContext<ContextProps | null>(null);

export const StateContext: React.FC<StateContextProps> = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<extendedProduct[]>([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //Increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  //Add Product to cart
  const onAdd = (product: IProduct, quantity: number) => {
    // Total Price
    setTotalPrice((prev) => prev + product.attributes.price * quantity);
    // Increase total quantity
    setTotalQuantities((prev) => prev + quantity);
    //Check if the product is already in the cart
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Remove Product from cart
  const onRemove = (product: IProduct) => {
    // Total Price
    setTotalPrice((prev) => prev - product.attributes.price);
    // Decrease total quantity
    setTotalQuantities((prev) => prev - 1);
    //Check if the product is already in the cart
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist && exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        setQty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext) as ContextProps;
