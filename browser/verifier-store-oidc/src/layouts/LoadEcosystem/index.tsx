import { useEffect } from "react";
import { Star } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";
import { useRecoilState } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import {
  AuthState,
  authStateState,
  userCredentialState,
} from "../../atoms/user";
import { LoadingItem } from "../../components/LoadingItem";

export const LoadEcosystem = () => {
  const [isEcosystemLoading, toggleEcosystemLoading] = useToggle(false);
  const [isError, toggleError] = useToggle(false);
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
      toggleError(true);
    }
  }, [location]);

  return (
    <div className="w-full h-full flex flex-col items-center place-content-center space-y-5 p-3">
      <LoadingItem
        isLoading={isEcosystemLoading}
        isError={isError}
        text={"Loading Settings"}
        onNext={() => {
          navigate("/");
        }}
        successElement={
          <div className="w-full flex flex-col items-start space-y-1">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="font-light leading-tight text-lg">Ecosystem</div>
              <div className="leading-tight text-lg">
                {authSettings?.ecosystem}
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="font-light leading-tight text-lg">Schema</div>
              <div className="leading-tight text-lg">
                {authSettings?.schema &&
                  authSettings.schema.replace(
                    "https://dev-schema.trinsic.cloud/",
                    ""
                  )}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
