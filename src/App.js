import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Compras from './pages/Compras';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import Login from './pages/Login';
import Register from './pages/Register';
import PostProduto from './pages/PostProduto';
import PostColecoes from './pages/PostColecoes';
import Carrinho from './pages/Carrinho';
import Adm from './pages/Adm';
import EditarProduto from './pages/EditarProduto';
import PrivateRoute from './components/PrivateRoute'; 

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/compras" element={<Compras />} />
      <Route path="/produto/:id" element={<ProdutoDetalhes />} />
      

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route path="/carrinho" element={
        <PrivateRoute>
          <Carrinho />
        </PrivateRoute>
      } />

      <Route path="/adm" element={
        <PrivateRoute>
          <Adm />
        </PrivateRoute>
      } />

      <Route path="/produto-up" element={
        <PrivateRoute>
          <PostProduto />
        </PrivateRoute>
      } />

      <Route path="/colecoes-up" element={
        <PrivateRoute>
          <PostColecoes />
        </PrivateRoute>
      } />

      <Route path="/editar-produto/:id" element={
        <PrivateRoute>
          <EditarProduto />
        </PrivateRoute>
      } />
    </Routes>
  </Router>
);

export default App;
