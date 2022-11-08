export type Product = {
  id: string;
  name?: string;
  price: number;
  qty: number;
  image?: string;
};

export const products: Product[] = [
  {
    id: "baby-anzio",
    name: "Baby Anzio",
    price: 10,
    qty: 0,
    image: "/images/artichokes/baby-anzio.jpg",
  },
  {
    id: "big-heart",
    name: "Big Heart",
    price: 10,
    qty: 0,
    image: "/images/artichokes/big-heart.jpg",
  },
];
