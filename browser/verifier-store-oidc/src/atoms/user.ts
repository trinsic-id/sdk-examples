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
