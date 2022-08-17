import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

import { AccountService } from "@trinsic/trinsic/browser"
const accountService = new AccountService();


function App() {
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    const fetchAuthToken = async () => {
      const authToken = await accountService.signIn();
      setAuthToken(authToken);
    };
    fetchAuthToken().catch((e) => console.error(e));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Your Trinsic Ecosystems Auth Token: {authToken}</p>
      </header>
    </div>
  );
}

export default App;
