import { useEffect } from "react";
import { Star } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";
import { useRecoilState } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import { AuthState, authStateAtom, userTokenState } from "../../atoms/user";
import { LoadingItem } from "../../components/LoadingItem";
import { AuthService } from "../../services/AuthService";

const authService = new AuthService();

export const LoadEcosystem = () => {
  const [isEcosystemLoading, toggleEcosystemLoading] = useToggle(false);
  const [isEcosystemError, toggleEcosystemError] = useToggle(false);
  const [authSettings, setAuthSettings] = useRecoilState(authSettingsState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ecosystem = params.get("ecosystem");
    const schema = params.get("schema");
    if (ecosystem && schema) {
      setAuthSettings({ ecosystem, schema });
      toggleEcosystemLoading(true);
    } else {
      toggleEcosystemError(true);
    }
  }, [location]);

  return (
    <div className="w-full h-full flex flex-col items-center place-content-center space-y-5">
      <LoadingItem
        isLoading={isEcosystemLoading}
        isError={isEcosystemError}
        text={"Loading Ecosystem"}
        onNext={() => {
          navigate("/");
        }}
      />
    </div>
  );
};
