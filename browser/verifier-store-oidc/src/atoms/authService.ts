import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../data/products";
import { AuthService } from "../services/AuthService";

interface AuthSettings {
  ecosystem: string;
  schema: string;
}

const { persistAtom } = recoilPersist();

export const authSettingsState = atom<AuthSettings | undefined>({
  key: "auth-settings",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
