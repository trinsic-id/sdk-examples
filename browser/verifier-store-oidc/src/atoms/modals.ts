import { atom } from "recoil";

export const isVerifyCredentialModalVisibleState = atom<boolean>({
  key: "verify-credential-modal-visible",
  default: false,
});
