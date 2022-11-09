import { atom, selector } from "recoil";
import { ProduceType } from "../data/products";
import { userCredentialState } from "./user";

export enum MemberLevel {
  GOLD = "A",
  SILVER = "B",
  BRONZE = "C",
  NONE = "N",
}

export const memberLevelState = selector<MemberLevel | undefined>({
  key: "member-level-state",
  get: ({ get }) => {
    const userCredential = get(userCredentialState);
    return userCredential?.credentialSubject.certificationGrade;
  },
});

export const memberProduceState = selector<ProduceType | undefined>({
  key: "member-produce-state",
  get: ({ get }) => {
    const userCredential = get(userCredentialState);
    return userCredential?.credentialSubject.produceType &&
      Object.values(ProduceType).includes(
        userCredential?.credentialSubject.produceType
      )
      ? userCredential.credentialSubject.produceType
      : undefined;
  },
});

export const filterProductsState = atom<boolean>({
  key: "filter-products",
  default: true,
});
