import { atom } from "recoil";

export enum AuthState {
  ANONYMOUS = "ANONYMOUS",
  VERIFIED = "VERIFIED",
}

export const authStateAtom = atom<AuthState>({
  key: "auth-state",
  default: AuthState.ANONYMOUS,
});

export const ItemPerFarm = 10;

export const itemsLeftAtom = atom<number>({
  key: "items-left",
  default: ItemPerFarm,
});

export const isVerifyCredentialModalVisibleAtom = atom<boolean>({
  key: "verify-credential-modal-visible",
  default: false,
});
