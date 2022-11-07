import { atom, selector } from "recoil";

export type Item = {
  id: string;
  price: number;
  qty: number;
};

export const cartState = atom<Item[]>({
  key: "cart",
  default: [],
});

export type Cart = {
  totalCost: number;
  totalQty: number;
};

export const cartTotalState = selector<Cart>({
  key: "cartState",
  get: ({ get }) => {
    const totalCost = get(cartState).reduce((a, b) => a + b.price * b.qty, 0);
    const totalQty = get(cartState).reduce((a, b) => a + b.qty, 0);
    return {
      totalCost,
      totalQty,
    };
  },
});
