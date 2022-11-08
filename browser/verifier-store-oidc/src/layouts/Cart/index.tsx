import React from "react";
import { useRecoilValue } from "recoil";
import { cartState, cartTotalState } from "../../atoms/atoms";
import CartButtons from "./CartButtons";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const cartItems = useRecoilValue(cartState);
  const { totalCost } = useRecoilValue(cartTotalState);
  return (
    <div className="w-full h-full bg-catalog-bg p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-full items-start rounded-lg bg-white py-3 px-4 divide-y-2">
          <div className="w-full text-xl font-medium pb-1">Cart</div>
          {cartItems.map((product, idx) => (
            <CartItem product={product} />
          ))}
        </div>
        {/* <div className="flex flex-col w-full items-start rounded-lg bg-white py-3 px-4 divide-y-2">
          <div className="w-full text-xl font-medium pb-1">Checkout</div>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
