import { useState } from "react";
import { Product } from "../../data/products";
import { CartQuantity } from "./CartQuantity";

interface CartItemProps {
  product: Product;
}

export const CartItem = ({ product }: CartItemProps) => {
  const [quantity, setQuantity] = useState(product.qty);
  return (
    <div className="flex flex-row w-full py-3 h-32 space-x-4">
      <img className="h-full rounded-lg" src={product.image} />
      <div className="flex flex-row flex-1 justify-between">
        <div className="flex flex-col items-start place-content-center w-64 justify-between">
          <div className="text-xl text-black">{product.name}</div>
          <div className="flex flex-row items-center divide-x-2 space-x-2">
            <div className="text-gray-500">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <div className="text-green-500 pl-2">In stock</div>
          </div>
          <CartQuantity quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="flex flex-col items-start place-content-center w-64 justify-between">
          <div className="text-black">
            {(product.price * product.qty).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
