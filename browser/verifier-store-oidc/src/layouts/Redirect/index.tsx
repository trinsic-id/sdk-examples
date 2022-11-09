import { useEffect } from "react";
import { Star } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import { MemberLevel, memberLevelState } from "../../atoms/member";
import {
  AuthState,
  authStateState,
  userCredentialState,
} from "../../atoms/user";
import { LoadingItem } from "../../components/LoadingItem";
import { CredentialDerivedProof } from "../../models/credential";
import { AuthService, defaultAuthSettings } from "../../services/AuthService";
import { generateSettings } from "../../utils/generateSettings";

export const Redirect = () => {
  const [isVerifyingLoading, toggleVerifyingLoading] = useToggle(false);
  const [isProfileLoading, toggleProfileLoading] = useToggle(false);
  const [isDiscountsLoading, toggleDiscountsLoading] = useToggle(false);
  const [isRedirectLoading, toggleRedirectLoading] = useToggle(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useRecoilState(authStateState);
  const [userToken, setUserToken] = useRecoilState(userCredentialState);
  const setMemberLevel = useSetRecoilState(memberLevelState);
  const authSettings = useRecoilValue(authSettingsState);
  useEffect(() => {
    toggleVerifyingLoading(true);
  }, []);
  useEffect(() => {
    let settings: typeof defaultAuthSettings;
    if (authSettings)
      settings = generateSettings(authSettings.ecosystem, authSettings.schema);
    else settings = generateSettings();
    const authService = new AuthService(settings);
    authService.signinRedirect().then(async () => {
      const user = await authService.getUser();
      if (user && user.profile._vp_token)
        setUserToken(user.profile._vp_token as CredentialDerivedProof);
      toggleVerifyingLoading(true);

      setAuthState(AuthState.VERIFIED);
      setMemberLevel(MemberLevel.BRONZE);
      console.log(JSON.stringify(user?.profile._vp_token));
      //navigate("/");
    });
  }, [location, authState, authSettings]);

  return (
    <div className="w-full h-full flex flex-col items-center place-content-center space-y-5 p-3">
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
            <img src="/images/agrio.jpeg" className="h-12 rounded-lg" />
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
          //navigate("/");
        }}
      />
    </div>
  );
};
