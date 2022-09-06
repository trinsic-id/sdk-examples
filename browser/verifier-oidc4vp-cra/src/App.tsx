import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppContent } from "./AppContent";

import { AuthService } from "./AuthService";
const authService = new AuthService();

function App() {
  useEffect(() => {
    const signinRedirect = async () => {
      try {
        //Note, if you are running React in Development mode this will be hit twice
        //as React mounts and unmounts the component twice for analysis.
        console.log("Callback received, signing in and redirecting");
        await authService.signinRedirect();
        (window as any).location = "index.html";
      } catch (e) {
        console.error(e);
      }
    };
    if (window.location.pathname === "/callback.html") {
      signinRedirect();
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {window.location.pathname === "/callback.html" && (
          <p>We're retrieving your information</p>
        )}
        {window.location.pathname !== "/callback.html" && (
          <>
            <p>
              Verification Demo using <code>OIDC4VP</code>
            </p>
            <AppContent authService={authService} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
