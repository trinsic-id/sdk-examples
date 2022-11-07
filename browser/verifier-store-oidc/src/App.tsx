import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/callback" element={<Catalog />} />
          <Route path="/silent_renew" element={<Catalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
