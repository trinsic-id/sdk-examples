import { useRecoilState } from "recoil";
import { cartState, Item } from "../../atoms/atoms";

export const useRemoveItem = () => {
  const [items, setItems] = useRecoilState(cartState);
  return (product: Item) => {
    setItems(items.filter((item) => item.id !== product.id));
  };
};
