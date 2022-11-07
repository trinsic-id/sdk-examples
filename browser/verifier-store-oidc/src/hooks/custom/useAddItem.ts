import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../atoms/atoms";

import {
  AuthState,
  authStateAtom,
  isVerifyCredentialModalVisibleAtom,
} from "../../atoms/user";
import { cloneIndex } from "../../utils/cloneIndex";

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
