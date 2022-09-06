import * as React from "react";
import { useEffect, useState } from "react";

import { AuthService } from "./AuthService";
const authService = new AuthService();

export function AppContent() {
  const [token, setToken] = useState("");
  useEffect(() => {
    console.log("Triggering app content getUser");
    const getUser = async () => {
      const user = await authService.getUser();
      if (user === null) {
        console.error("Could not find user");
        return;
      }
      console.log(user);
      setToken(JSON.stringify(user.profile._vp_token, null, 2));
    };
    getUser();
  }, []);
  return (
    <>
      <button onClick={() => authService.login()}>Share Credential</button>

      <pre>{token}</pre>
    </>
  );
}
