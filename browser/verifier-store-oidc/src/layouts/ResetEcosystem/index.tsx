import { useEffect } from "react";
import { Star } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";
import { useRecoilState, useResetRecoilState } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import {
  AuthState,
  authStateState,
  userCredentialState,
} from "../../atoms/user";
import { LoadingItem } from "../../components/LoadingItem";

export const ResetEcosystem = () => {
  const [isEcosystemResetting, toggleEcosystemResetting] = useToggle(false);
  const [isError, toggleError] = useToggle(false);
  const resetAuthSettings = useResetRecoilState(authSettingsState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    resetAuthSettings();
    toggleEcosystemResetting(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center place-content-center space-y-5 p-3">
      <LoadingItem
        isLoading={isEcosystemResetting}
        isError={isError}
        text={"Resetting Ecosystem"}
        onNext={() => {
          navigate("/");
        }}
      />
    </div>
  );
};
