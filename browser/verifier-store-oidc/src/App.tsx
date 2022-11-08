import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Catalog from "./layouts/Catalog";
import Cart from "./layouts/Cart";
import { Home } from "./layouts/Home";
import { Redirect } from "./layouts/Redirect";
import { LoadEcosystem } from "./layouts/LoadEcosystem";

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/load-ecosystem" element={<LoadEcosystem />} />
          <Route path="/silent_renew" element={<Catalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
