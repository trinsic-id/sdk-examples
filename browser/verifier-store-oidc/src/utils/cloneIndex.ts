import { Product } from "../data/products";

export const cloneIndex = (items: Product[], id: string) => ({
  clone: items.map((item) => ({ ...item })),
  index: items.findIndex((item) => item.id === id),
});
