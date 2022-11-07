import React from "react";
import PropTypes from "prop-types";
import {
  useAddItem,
  useDecreaseItem,
  useRemoveItem,
} from "../hooks/useAddItem";
import { cart, Item } from "../atoms/atoms";

interface CartButtonsProps {
  item: Item;
}

export const CartButtons = ({ item }: CartButtonsProps) => {
  const add = useAddItem();
  const remove = useRemoveItem();
  const decrease = useDecreaseItem();
  return (
    <div className="flex flex-row text-white">
      <button
        onClick={() => decrease(item)}
        className="px-4 py-1 bg-gray-300 rounded-l-lg"
      >
        -
      </button>
      <button onClick={() => add(item)} className="px-4 py-1 bg-green-400">
        +
      </button>
      <button
        onClick={() => remove(item)}
        className="px-4 py-1 bg-red-500 rounded-r-lg"
      >
        x
      </button>
    </div>
  );
};

export default CartButtons;
