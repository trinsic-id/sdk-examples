import { useEffect } from "react";
import { Star } from "react-feather";
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
    toggleVerifyingLoading(true);
  }, []);
  useEffect(() => {
    authService.signinRedirect().then(async () => {
      const user = await authService.getUser();
      if (user) setUserToken(user.profile._vp_token);
      toggleVerifyingLoading(true);
      setAuthState(AuthState.VERIFIED);
    });
  }, [location, authState]);

  return (
    <div className="w-full h-full flex flex-col items-center place-content-center space-y-5">
      <LoadingItem
        isLoading={isVerifyingLoading}
        text={"Verifying Credential"}
        onNext={() => {
          toggleVerifyingLoading(false);
          toggleProfileLoading(true);
        }}
        successElement={
          <div className="w-full flex flex-row items-center">
            <div className="font-light leading-tight text-lg w-full">
              {`Credential issued by the`}
              <br />
              {`Agrio Farming Community`}
            </div>
            <img src="/agrio.jpeg" className="h-12 rounded-lg" />
          </div>
        }
      />
      <LoadingItem
        isLoading={isProfileLoading}
        text={"Fetching profile"}
        onNext={() => {
          toggleProfileLoading(false);
          toggleDiscountsLoading(true);
        }}
        successElement={
          <div className="w-full flex flex-row items-center justify-between">
            <div className="font-light text-lg leading-tight">
              Artichoke Gold farmer
            </div>
            <Star size={28} className={"stroke-yellow-400 fill-yellow-400"} />
          </div>
        }
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
          //   navigate("/");
        }}
      />
    </div>
  );
};
