import { useEffect, useState } from "react";
import { AuthService } from "./AuthService";
import { Token } from "./Token";

export function AppContent(props: { authService: AuthService }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const user = await props.authService.getUser();
      if (user === null) {
        console.error("Could not find user");
        return;
      }
      setToken(JSON.stringify(user.profile._vp_token, null, 2));
    };
    getUser();
  }, [props.authService]);
  return (
    <>
      <button onClick={() => {
        console.log("Logging in");
        props.authService.login().then(() => console.log("Logged in")).catch(e => console.error(e))
      }}>
        Share Credential
      </button>
      <br />
      {token !== "" && <Token token={token} />}
    </>
  );
}
