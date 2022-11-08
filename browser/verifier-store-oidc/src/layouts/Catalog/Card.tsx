import { Bookmark, Star } from "react-feather";
import { Product } from "../../data/products";

import { useAddItem } from "../../hooks/custom/useAddItem";
import { NewSeason } from "./NewSeason";
import { Sale } from "./Sale";

interface CardProps {
  product: Product;
}
export const Card = ({ product }: CardProps) => {
  const addItem = useAddItem();

  return (
    <div
      key={product.id}
      className="flex flex-col items-center gap-3 border p-4 rounded-lg w-64"
    >
      <div className="flex flex-row w-full items-center justify-between">
        <Sale />
        <Bookmark className="stroke-gray-500" size={18} />
      </div>

      <div className="flex flex-col items-center w-full pt-3">
        <img className="w-1/2 rounded-lg" src={product.image} />
      </div>
    </div>
  );
};
