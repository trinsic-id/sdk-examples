import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/atoms";
import { Product } from "../../data/products";

export const useRemoveItem = () => {
  const [items, setItems] = useRecoilState(cartState);
  return (product: Product) => {
    setItems(items.filter((item) => item.id !== product.id));
  };
};
