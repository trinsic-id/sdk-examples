import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, cartTotalState, Item } from "../../atoms/atoms";

import {
  AuthState,
  authStateAtom,
  isVerifyCredentialModalVisibleAtom,
} from "../../atoms/user";

export const cloneIndex = (items: Item[], id: string) => ({
  clone: items.map((item) => ({ ...item })),
  index: items.findIndex((item) => item.id === id),
});

export const useAddItem = () => {
  const [isVerifyModalVisible, setVerifyModalVisible] = useRecoilState(
    isVerifyCredentialModalVisibleAtom
  );
  const isCredentialVerified = useRecoilValue(authStateAtom);

  const [items, setItems] = useRecoilState(cartState);

  return useCallback(
    (product: any) => {
      if (isCredentialVerified === AuthState.ANONYMOUS)
        return setVerifyModalVisible(true);
      const { clone, index } = cloneIndex(items, product.id);
      if (index !== -1) {
        clone[index].qty += 1;
        setItems(clone);
      } else {
        setItems([...clone, { ...product, qty: 1 }]);
      }
    },
    [setVerifyModalVisible, isCredentialVerified, items, setItems]
  );
};

export const useRemoveItem = () => {
  const [items, setItems] = useRecoilState(cartState);
  return (product: Item) => {
    setItems(items.filter((item) => item.id !== product.id));
  };
};

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
