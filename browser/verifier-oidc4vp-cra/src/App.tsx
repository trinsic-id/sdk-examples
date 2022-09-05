import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppContent from './AppContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Verification Demo using <code>OIDC4VP</code>
        </p>
        <AppContent />
      </header>
    </div>
  );
}

export default App;
