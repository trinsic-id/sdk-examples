import { atom } from "recoil";
import { CredentialDerivedProof } from "../models/credential";

export enum AuthState {
  ANONYMOUS = "ANONYMOUS",
  VERIFIED = "VERIFIED",
}

export const authStateState = atom<AuthState>({
  key: "auth-state",
  default: AuthState.ANONYMOUS,
});

export const userCredentialState = atom<CredentialDerivedProof | undefined>({
  key: "user-credential-state",
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
