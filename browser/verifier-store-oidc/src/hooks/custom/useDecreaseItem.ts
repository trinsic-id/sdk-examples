import { useRecoilState } from "recoil";
import { cartState, Item } from "../../atoms/atoms";
import { cloneIndex } from "../../utils/cloneIndex";
import { useRemoveItem } from "./useRemoveItem";

export const useDecreaseItem = () => {
  const [items, setItems] = useRecoilState(cartState);
  const removeItem = useRemoveItem();
  return (product: Item) => {
    const { clone, index } = cloneIndex(items, product.id);
    if (clone[index].qty === 1) {
      removeItem(product);
    } else {
      clone[index].qty -= 1;
      setItems(clone);
    }
  };
};
