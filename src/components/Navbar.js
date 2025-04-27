import React from 'react';
import './css/Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark navbar-codewear fixed-top">
    <div className="container">
      <a className="navbar-brand navbar-codewear__brand" href="/">Code<span className="text-danger">Wear</span></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto navbar-codewear__menu">
          <li className="nav-item">
            <a className="nav-link" href="/compras">Coleções</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
