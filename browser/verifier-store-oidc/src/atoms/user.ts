import { atom } from "recoil";

export enum AuthState {
  ANONYMOUS = "ANONYMOUS",
  VERIFIED = "VERIFIED",
}

export const authStateState = atom<AuthState>({
  key: "auth-state",
  default: AuthState.ANONYMOUS,
});

export const userTokenState = atom<any | undefined>({
  key: "user-token-state",
  default: undefined,
});

export const ItemPerFarm = 10;

export const itemsLeftState = atom<number>({
  key: "items-left",
  default: ItemPerFarm,
});

export const isVerifyCredentialModalVisibleState = atom<boolean>({
  key: "verify-credential-modal-visible",
  default: false,
});
