import React, { useState } from 'react';
import { useUsuarios } from '../hooks/useUsuarios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const { criarUsuario } = useUsuarios();
  const navigate = useNavigate();

  const [nomeCompleto, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [roleId] = useState(1);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await criarUsuario({
        nomeCompleto,
        email,
        senha,
        roleId,
      });
      setSucesso(true);
      setErro('');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setErro('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page d-flex align-items-center justify-content-center">
        <div className="login-card p-5 shadow-lg rounded-4">
          <h2 className="text-center mb-4 text-danger fw-bold">Code<span className="text-dark">Wear</span></h2>
          <h5 className="text-center mb-4 text-secondary">Crie sua conta</h5>
          <form onSubmit={handleSubmit}>
            {erro && <div className="alert alert-danger">{erro}</div>}
            {sucesso && (
              <div className="alert alert-success">
                Registro feito com sucesso! Redirecionando...
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Nome:</label>
              <input
                type="text"
                className="form-control"
                value={nomeCompleto}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
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
              Registrar
            </button>
          </form>
          <div className="text-center mt-4">
            <small className="text-muted">
              Já tem uma conta? <a href="/login" className="text-danger">Faça login</a>
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
