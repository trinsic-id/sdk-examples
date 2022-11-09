import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Filter, Trello } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filterProductsState,
  MemberLevel,
  memberLevelState,
} from "../../atoms/member";
import {
  AuthState,
  authStateState,
  userCredentialState,
} from "../../atoms/user";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { products } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";
import { AuthService } from "../../services/AuthService";
import { Card } from "./Card";

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
  filterText: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
};

const Catalog = () => {
  const memberLevel = useRecoilValue(memberLevelState);

  const memberLevelObj = useMemo(
    () => ({
      isGoldMember: memberLevel === MemberLevel.GOLD,
      isSilverMember: memberLevel === MemberLevel.SILVER,
      isBronzeMember: memberLevel === MemberLevel.BRONZE,
    }),
    [memberLevel]
  );

  const [isFiltered, toggleFilter] = useRecoilState(filterProductsState);

  return (
    <div className="w-full h-screen overflow-y-scroll p-4 bg-catalog-bg flex flex-col items-start space-y-4">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row items-start space-x-2">
          <Trello size={28} color={"#82AE68"} />
          <div className="text-2xl text-black">Products</div>
        </div>
        <div
          className="flex flex-row items-center space-x-2 cursor-pointer"
          onClick={() => {
            toggleFilter((val) => !val);
          }}
        >
          <AnimatePresence exitBeforeEnter>
            {isFiltered ? (
              <motion.div
                key="filter"
                className={``}
                variants={Animations.filterText}
                initial={isFiltered ? "visible" : "hidden"}
                animate={"visible"}
                exit={"hidden"}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <div className="text-lg text-black">Filter</div>
              </motion.div>
            ) : (
              <motion.div
                key="show-all"
                className={``}
                variants={Animations.filterText}
                initial={!isFiltered ? "visible" : "hidden"}
                animate={"visible"}
                exit={"hidden"}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <div className="text-lg text-black">Show all</div>
              </motion.div>
            )}
          </AnimatePresence>
          <Filter
            size={20}
            color={"black"}
            className={`${
              isFiltered ? "opacity-100" : "opacity-30"
            } duration-300`}
          />
        </div>
      </div>
      <motion.div
        className="flex flex-col h-full overflow-y-scroll space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start"
        key="container"
        variants={Animations.container}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <Card product={product} {...memberLevelObj} key={product.id} />
        ))}
      </motion.div>
      <VerifyCredentialModal />
    </div>
  );
};

export default Catalog;
