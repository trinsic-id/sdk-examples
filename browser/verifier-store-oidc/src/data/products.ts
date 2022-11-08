export enum ProductHeader {
  NewSeason,
  Sale,
}

export type Product = {
  id: string;
  name?: string;
  prevPrice?: number;
  price: number;
  qty: number;
  image?: string;
  header: ProductHeader;
  subTitle: string;
};

export const products: Product[] = [
  {
    id: "baby-anzio",
    name: "Baby Anzio",
    price: 40,
    qty: 0,
    image: "/images/artichokes/baby-anzio.jpg",
    header: ProductHeader.NewSeason,
    subTitle: "Premium Artichoke Strain",
  },
  {
    id: "big-heart",
    name: "Big Heart",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/artichokes/big-heart.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Artichoke Strain",
  },
];
