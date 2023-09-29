import React from "react";
import { AppContext } from "../App";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = cartItems
    .reduce((sum, obj) => {
      return parseFloat(obj.price) + sum;
    }, 0)
    .toFixed(2);

  return { cartItems, setCartItems, totalPrice };
};
