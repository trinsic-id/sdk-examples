import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../atoms/cart";
import { isVerifyCredentialModalVisibleState } from "../../atoms/modals";

import { AuthState, authStateState } from "../../atoms/user";
import { Product } from "../../data/products";
import { cloneIndex } from "../../utils/cloneIndex";

export const useAddItem = () => {
  const [isVerifyModalVisible, setVerifyModalVisible] = useRecoilState(
    isVerifyCredentialModalVisibleState
  );
  const isCredentialVerified = useRecoilValue(authStateState);

  const [items, setItems] = useRecoilState(cartState);

  return useCallback(
    (product: Product, qty: number = 1) => {
      if (isCredentialVerified === AuthState.ANONYMOUS)
        return setVerifyModalVisible(true);
      const { clone, index } = cloneIndex(items, product.id);
      if (index !== -1) {
        clone[index].qty += qty;
        setItems(clone);
      } else {
        setItems([...clone, { ...product, qty: qty }]);
      }
    },
    [setVerifyModalVisible, isCredentialVerified, items, setItems]
  );
};
