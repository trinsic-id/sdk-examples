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
    <div className="flex flex-col h-full space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start bg-catalog-bg p-4">
      {products.map((product) => (
        <Card product={product} />
      ))}
      <VerifyCredentialModal authService={authService} />
    </div>
  );
};

export default Catalog;
