import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Compras from './pages/Compras';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import Login from './pages/Login';
import Register from './pages/Register';
import MeusPedidos from './pages/MeusPedidos';
import PedidoDetalhe from './pages/PedidoDetalhe';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/produtoX" element={<ProdutoDetalhes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/meus-pedidos" element={<MeusPedidos />} />
      <Route path="/pedido-detalhe" element={<PedidoDetalhe />} />
    </Routes>
  </Router>
);

export default App;
