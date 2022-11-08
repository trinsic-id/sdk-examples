import { Listbox, Tab, Transition } from "@headlessui/react";
import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "react-feather";
import { Product } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";

const Quantities = [1, 2, 3, 4, 5];

interface CardButtonProps {
  product: Product;
}

export const CardButtons = ({ product }: CardButtonProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useAddItem();
  return (
    <div className="flex flex-row items-center w-full gap-4 h-12 md:h-18">
      <div className="flex flex-row h-full w-1/2 rounded-lg relative bg-transparent">
        <button
          data-action="decrement"
          className=" bg-catalog-bg text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={() => setQuantity((val) => Math.max(val - 1, 1))}
        >
          <span className="m-auto text-2xl font-thin">{"-"}</span>
        </button>
        <input
          type="number"
          className="focus:outline-none text-center w-full bg-catalog-bg font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          min={1}
          value={quantity}
        ></input>
        <button
          data-action="increment"
          className="bg-catalog-bg text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={() => setQuantity((val) => val + 1)}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
      <button
        className="w-1/2 h-full bg-blue-500 rounded-lg text-white px-2 py-3 flex flex-row items-center space-x-3 place-content-center"
        onClick={() => {
          addItem(product, quantity);
          setQuantity(1);
        }}
      >
        <span>Add to cart</span>
        <ShoppingCart className="stroke-white" size={18} />
      </button>
    </div>
  );
};
