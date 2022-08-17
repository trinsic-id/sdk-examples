import logo from "./logo.svg";
import "./App.css";
import { AccountService } from "@trinsic/trinsic/lib/browser";

const service = new AccountService();

function App() {
  service.signIn({}).then((response) => {
    console.log(`auth_token = ${response}`);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className="smaller">(open developer console to see output)</p>
      </header>
    </div>
  );
}

export default App;
