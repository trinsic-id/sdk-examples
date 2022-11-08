import { motion } from "framer-motion";
import { useMemo } from "react";
import { Bookmark, ShoppingCart, Star } from "react-feather";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../atoms/user";
import { Product, ProductHeader } from "../../data/products";

import { useAddItem } from "../../hooks/custom/useAddItem";
import { applyGoldDiscount } from "../../utils/goldDiscount";
import { CardButtons } from "./CardButtons";
import { GoldMember } from "./GoldMember";
import { NewSeason } from "./NewSeason";
import { Sale } from "./Sale";

const Animations = {
  container: {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  },
  item: {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  },
};

interface CardProps {
  product: Product;
  isGoldMember: boolean;
}
export const Card = ({ product, isGoldMember }: CardProps) => {
  const goldAdjustment = useMemo(() => {
    if (!isGoldMember) return undefined;

    return {
      goldPrice: applyGoldDiscount(product.price),
      prevPrice: product.price,
    };
  }, [product, isGoldMember]);

  return (
    <motion.div
      variants={Animations.item}
      key={product.id}
      className="flex flex-col items-center gap-3 border p-4 rounded-lg w-full md:max-w-md bg-white"
    >
      <div className="flex flex-row w-full items-center justify-between h-12">
        {product.header === ProductHeader.Sale && !isGoldMember && <Sale />}
        {product.header === ProductHeader.NewSeason && !isGoldMember && (
          <NewSeason />
        )}
        {goldAdjustment && <GoldMember />}
        <Bookmark className="stroke-gray-500 hidden md:block" size={18} />
        <Bookmark className="stroke-gray-500 md:hidden" size={24} />
      </div>

      <div className="flex flex-col items-center w-full pt-3 space-y-3 pb-3">
        <img className="w-2/3 rounded-lg" src={product.image} />
        <div className="text-xl font-medium text-black ">{product.name}</div>
        <div className="text-md font-light text-gray-500">
          {product.subTitle}
        </div>
        {goldAdjustment !== undefined ? (
          <div className="flex flex-row items-center space-x-4">
            <div className="text-lg font-medium text-yellow-600 ">
              {goldAdjustment.goldPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <div className="text-md font-light text-gray-500 line-through">
              {goldAdjustment.prevPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-4">
            <div className="text-lg font-medium text-black ">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            {product.header === ProductHeader.Sale && product.prevPrice && (
              <div className="text-md font-light text-gray-500 line-through">
                {product.prevPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <CardButtons product={product} />
    </motion.div>
  );
};
