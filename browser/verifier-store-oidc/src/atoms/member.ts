import { atom } from "recoil";

export enum MemberLevel {
  GOLD = "A",
  SILVER = "B",
  BRONZE = "C",
  NONE = "N",
}

export const memberLevelState = atom<MemberLevel>({
  key: "member-status",
  default: MemberLevel.NONE,
});
