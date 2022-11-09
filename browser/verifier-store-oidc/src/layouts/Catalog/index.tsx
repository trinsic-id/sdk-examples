import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { MemberLevel, memberLevelState } from "../../atoms/member";
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

  return (
    <motion.div
      className="flex flex-col h-full overflow-y-scroll space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start bg-catalog-bg p-4"
      key="container"
      variants={Animations.container}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <Card product={product} {...memberLevelObj} key={product.id} />
      ))}
      <VerifyCredentialModal />
    </motion.div>
  );
};

export default Catalog;
