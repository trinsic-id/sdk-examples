import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { AuthState, authStateAtom, userTokenState } from "../../atoms/user";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { products } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";
import { AuthService } from "../../services/AuthService";
import { Card } from "./Card";

const authService = new AuthService();

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
  const addItem = useAddItem();
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const [userToken, setUserToken] = useRecoilState(userTokenState);

  useEffect(() => {
    if (userToken) console.log("UserToken", userToken.credentialSubject);
  }, [userToken]);

  useEffect(() => {
    if (
      location.pathname === "/callback" &&
      authState === AuthState.ANONYMOUS
    ) {
      setAuthState(AuthState.VERIFIED);
      authService.signinRedirect().then(async () => {
        const user = await authService.getUser();
        if (user) setUserToken(user.profile._vp_token);
        navigate("/");
      });
    }
  }, [location, authState]);
  return (
    <motion.div
      className="flex flex-col h-full space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start bg-catalog-bg p-4"
      key="container"
      variants={Animations.container}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <Card product={product} />
      ))}
      <VerifyCredentialModal authService={authService} />
    </motion.div>
  );
};

export default Catalog;
