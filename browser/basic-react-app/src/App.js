import logo from "./logo.svg";
import "./App.css";
import { WalletService } from "@trinsic/trinsic-web";

const service = new WalletService("http://localhost:5000");

function App() {
  service.getProviderConfiguration().then((response) => {
    console.log(response.toObject());
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <p className="smaller">(open developer console to see output)</p>
      </header>
    </div>
  );
}

export default App;
