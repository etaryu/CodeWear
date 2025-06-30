import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sucesso = await login(email, senha);

    if (sucesso) {
    } else {
      setErro('Email ou senha inválidos');
    }
};


  return (
    <>
      <Navbar />
      <div className="login-page d-flex align-items-center justify-content-center">
        <div className="login-card p-5 shadow-lg rounded-4">
          <h2 className="text-center mb-4 text-danger fw-bold">
            Code<span className="text-dark">Wear</span>
          </h2>
          <h5 className="text-center mb-4 text-secondary">Faça seu login</h5>
          <form onSubmit={handleSubmit}>
            {erro && <div className="alert alert-danger">{erro}</div>}
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Senha:</label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Entrar
            </button>
          </form>
          <div className="text-center mt-4">
            <small className="text-muted">
              Ainda não tem uma conta?{' '}
              <a href="/register" className="text-danger">
                Cadastre-se
              </a>
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
