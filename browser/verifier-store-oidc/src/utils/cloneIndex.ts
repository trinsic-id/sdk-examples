import { Item } from "../atoms/atoms";

export const cloneIndex = (items: Item[], id: string) => ({
  clone: items.map((item) => ({ ...item })),
  index: items.findIndex((item) => item.id === id),
});
