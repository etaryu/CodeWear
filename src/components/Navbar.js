import React from 'react';
import './css/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle, FaShoppingCart, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-codewear fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand navbar-codewear__brand" to="/">
          Code<span className="text-danger">Wear</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/compras">
                Coleções
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item d-flex align-items-center text-white">
                  <FaUserCircle size={22} className="me-1 text-secondary" />
                  <span className="nav-link">Olá, {user?.nomeCompleto.split(' ')[0]}</span>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light d-flex align-items-center gap-2" to="/carrinho">
                    <FaShoppingCart /> Meu Carrinho
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light d-flex align-items-center gap-2" to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-danger d-flex align-items-center gap-2" to="/register">
                    <FaUserPlus /> Registrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
