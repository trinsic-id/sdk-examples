export enum ProduceType {
  ARTICHOKE = "Artichoke",
  CORN = "Corn",
}

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
  hide?: boolean;
  produceType: ProduceType;
};

export const products: Product[] = [
  {
    id: "baby-anzio-artichoke",
    name: "Baby Anzio",
    price: 40,
    qty: 0,
    image: "/images/artichokes/baby-anzio.jpg",
    header: ProductHeader.NewSeason,
    subTitle: "Premium Artichoke Strain",
    produceType: ProduceType.ARTICHOKE,
  },
  {
    id: "big-heart-artichoke",
    name: "Big Heart",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/artichokes/big-heart.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Artichoke Strain",
    produceType: ProduceType.ARTICHOKE,
  },
  {
    id: "ambrosia",
    name: "Ambrosia",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/corn/ambrosia.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Corn Strain",
    produceType: ProduceType.CORN,
    hide: true,
  },
  {
    id: "blue-hopi",
    name: "Blue Hopi",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/corn/blue-hopi.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Corn Strain",
    produceType: ProduceType.CORN,
    hide: true,
  },
  {
    id: "blue-hopi2",
    name: "Blue Hopi",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/corn/blue-hopi.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Corn Strain",
    produceType: ProduceType.CORN,
    hide: true,
  },
  {
    id: "blue-hopi3",
    name: "Blue Hopi",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/corn/blue-hopi.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Corn Strain",
    produceType: ProduceType.CORN,
    hide: true,
  },
  {
    id: "big-heart-artichoke2",
    name: "Big Heart",
    prevPrice: 75,
    price: 55,
    qty: 0,
    image: "/images/artichokes/big-heart.jpg",
    header: ProductHeader.Sale,
    subTitle: "Premium Artichoke Strain",
    produceType: ProduceType.ARTICHOKE,
  },
];
