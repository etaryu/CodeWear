import React from 'react';
import './css/Compras.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Compras = () => {
  return (
    <div>
      <Navbar />
      <section className="comprar py-5 pt-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 d-none d-md-block">
              <div className="sidebar">
                <h5 className="sidebar__title">Filtrar por Coleção</h5>
                <div className="sidebar__category">
                  <h6 className="sidebar__category-title">Linguagens</h6>
                  <ul className="sidebar__list">
                    <li><a href="#java" className="sidebar__item">Java</a></li>
                    <li><a href="#javascript" className="sidebar__item">JavaScript</a></li>
                    <li><a href="#python" className="sidebar__item">Python</a></li>
                  </ul>
                </div>
                <div className="sidebar__category">
                  <h6 className="sidebar__category-title">Outros Filtros</h6>
                  <ul className="sidebar__list">
                    <li><a href="#nova-colecao" className="sidebar__item">Nova Coleção</a></li>
                    <li><a href="#mais-vendidos" className="sidebar__item">Mais Vendidos</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <h2 className="comprar__title mb-4">Escolha seu Estilo</h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {[...Array(6)].map((_, i) => (
                  <div className="col mb-4" key={i}>
                    <div className="card h-100 shadow-sm rounded">
                      <img src="/img/redcamisa.jpg" className="card-img-top" alt="Camiseta Dev" />
                      <div className="card-body">
                        <h5 className="card-title">Camiseta Dev Vermelha</h5>
                        <p className="card-text text-muted">Confortável, estilosa e ideal para programadores!</p>
                        <p className="card-text fw-bold">R$ 89,90</p>
                        <a href="/produtoX" className="btn btn-dark w-100">
                        Adicionar ao Carrinho
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Compras;