import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdutoDetalhes from "./pages/ProdutoDetalhes";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Compras from "./pages/Compras";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtoX" element={<ProdutoDetalhes />} />
      <Route path="/compras" element={<Compras />} />
    </Routes>
  </Router>
);

export default App;
