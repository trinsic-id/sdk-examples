import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";
import { useRecoilState } from "recoil";
import { AuthState, authStateAtom, userTokenState } from "../../atoms/user";
import { AuthService } from "../../services/AuthService";
import { LoadingItem } from "./LoadingItem";

const authService = new AuthService();

export const Redirect = () => {
  const [isVerifyingLoading, toggleVerifyingLoading] = useToggle(false);
  const [isProfileLoading, toggleProfileLoading] = useToggle(false);
  const [isDiscountsLoading, toggleDiscountsLoading] = useToggle(false);
  const [isRedirectLoading, toggleRedirectLoading] = useToggle(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const [userToken, setUserToken] = useRecoilState(userTokenState);

  useEffect(() => {
    setAuthState(AuthState.VERIFIED);
    authService.signinRedirect().then(async () => {
      const user = await authService.getUser();
      if (user) setUserToken(user.profile._vp_token);
      toggleVerifyingLoading(true);
    });
  }, [location, authState]);

  return (
    <div className="w-full h-full flex items-center place-content-center">
      <div className="w-3/12 h-1/3 rounded-lg bg-gray-300 p-4 flex flex-col">
        <div className="text-2xl text-black border-b border-black pb-2 mb-4">
          Logging you in
        </div>
        <div className="flex flex-1 flex-col items-start space-y-3 pt-4">
          <LoadingItem
            isLoading={isVerifyingLoading}
            text={"Verifying Credential"}
            onNext={() => {
              toggleVerifyingLoading(false);
              toggleProfileLoading(true);
            }}
          />
          <LoadingItem
            isLoading={isProfileLoading}
            text={"Fetching profile"}
            onNext={() => {
              toggleProfileLoading(false);
              toggleDiscountsLoading(true);
            }}
          />
          <LoadingItem
            isLoading={isDiscountsLoading}
            text={"Fetching discounts and limits"}
            onNext={() => {
              toggleDiscountsLoading(false);
              toggleRedirectLoading(true);
            }}
          />
          <LoadingItem
            isLoading={isRedirectLoading}
            text={"Redirecting to store"}
            onNext={() => {
              toggleRedirectLoading(false);
              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};
