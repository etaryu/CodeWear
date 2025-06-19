// src/pages/Compras.jsx

import React, { useEffect, useState } from 'react';
import './css/Compras.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProdutos } from '../hooks/useProdutos';

const Compras = () => {
  const { listarProdutos } = useProdutos();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const { data } = await listarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="comprar py-5 pt-5 mt-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
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

            {/* Produtos */}
            <div className="col-md-9">
              <h2 className="comprar__title mb-4">Escolha seu Estilo</h2>

              {loading ? (
                <p>Carregando produtos...</p>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                  {(produtos.length > 0 ? produtos : [...Array(6)]).map((produto, i) => (
                    <div className="col mb-4" key={produto?.id || i}>
                      <div className="card h-100 shadow-sm rounded">
                        <img
                          src={
                            produto?.urlImagem
                              ? produto.urlImagem
                              : '/img/redcamisa.jpg'
                          }
                          className="card-img-top"
                          alt={produto?.nome || 'Camiseta Dev'}
                          style={{ objectFit: 'cover', height: '250px' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{produto?.nome || 'Camiseta Dev Vermelha'}</h5>
                          <p className="card-text text-muted">
                            {produto?.descricao || 'Confortável, estilosa e ideal para programadores!'}
                          </p>
                          <p className="card-text fw-bold mb-4">
                            R$ {produto?.preco ? produto.preco.toFixed(2) : '89,90'}
                          </p>
                          <a
                            href={produto?.id ? `/produto/${produto.id}` : '#'}
                            className="btn btn-dark mt-auto w-100"
                          >
                            Adicionar ao Carrinho
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Compras;
