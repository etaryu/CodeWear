import React, { useEffect, useState } from 'react';
import './css/Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useProdutos } from '../hooks/useProdutos';
import { useComentarios } from '../hooks/useComentarios';
import { useUsuarios } from '../hooks/useUsuarios';
import { useColecoes } from '../hooks/useColecoes';

const Home = () => {
  const { listarProdutos } = useProdutos();
  const { listarComentarios } = useComentarios();
  const { listarUsuarios } = useUsuarios();
  const { listarColecoes } = useColecoes();

  const [produtos, setProdutos] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [colecoes, setColecoes] = useState([]);

  const [erroProdutos, setErroProdutos] = useState(false);
  const [erroComentarios, setErroComentarios] = useState(false);

  useEffect(() => {
    listarProdutos().then(res => setProdutos(res.data)).catch(() => setErroProdutos(true));
    listarUsuarios().then(res => setUsuarios(res.data));
    listarComentarios().then(res => setComentarios(res.data)).catch(() => setErroComentarios(true));
    listarColecoes().then(res => setColecoes(res.data));
  }, []);

  const obterImagemDaColecao = (colecaoId) => {
    const produto = produtos.find(p => p.colecaoId === colecaoId && p.imagemPrincipal);
    return produto?.imagemPrincipal || '/img/colecao-placeholder.jpg';
  };

  return (
    <div>
      <Navbar />

      <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white">
        <h1 className="hero-section__title">
          <span className="text-danger">Deploy</span> de conforto, <span className="text-danger">commit</span> de autenticidade!
        </h1>
        <p className="hero-section__subtitle lead mt-3">
          <span className="text-danger">Na CodeWear</span>, acreditamos que programar vai além do código – é sobre expressão, conforto e identidade.
          Criamos roupas para <span className="text-danger">devs</span> que valorizam estilo sem abrir mão da praticidade, seja no home office,
          no escritório ou em eventos tech.
        </p>
        <a href="/compras" className="btn btn-danger mt-4 px-5 py-3 fs-5 rounded-pill">
          Ver Produtos
        </a>
      </section>

      <section id="nova-colecao" className="nova-colecao py-5 text-center">
        <h2 className="nova-colecao__title">Coleção destaque!</h2>
        <div className="container">
          <div className="row justify-content-center mt-4 nova-colecao__list">
            {(erroProdutos
              ? [...Array(4)]
              : produtos.filter(p => p.imagemPrincipal).slice(0, 3)
            ).map((produto, i) => (
              <div className="col-6 col-md-3 mb-4 nova-colecao__item" key={i}>
                <Link to={`/produto/${produto?.id}`} className="text-decoration-none">
                  <div className="nova-colecao__image-container">
                    <img
                      src={produto?.imagemPrincipal || '/img/redcamisa.jpg'}
                      alt={produto?.nome || 'Camiseta'}
                      className="img-fluid nova-colecao__image"
                    />
                  </div>
                  <div className="nova-colecao__name">
                    <p className="nova-colecao__text">{produto?.nome || 'Camiseta Dev Vermelha'}</p>
                  </div>
                  <div className="nova-colecao__price">
                    <p className="nova-colecao__text">
                      {produto?.preco ? `R$ ${produto.preco.toFixed(2)}` : 'R$ 89,90'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="colecoes" className="colecoes py-5 bg-light text-center">
        <h2 className="colecoes__title">Coleções</h2>
        <div className="row justify-content-center mt-4 colecoes__list">
          {(colecoes.length === 0 ? [...Array(4)] : colecoes.slice(0, 4)).map((colecao, i) => (
            <div key={colecao?.id || i} className="col-6 col-md-3 mb-4 colecoes__item">
              <img
                src={colecao ? obterImagemDaColecao(colecao.id) : '/img/placeholder.jpg'}
                alt={colecao?.nome || 'Coleção'}
                className="img-fluid colecoes__image"
              />
              <p className="colecoes__text">{colecao?.nome || 'Carregando...'}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="comentarios" className="comentarios py-5 bg-light text-center">
        <h2 className="comentarios__title mb-5">Comentários em Destaque</h2>
        <div className="row justify-content-center comentarios__list">
          {(erroComentarios
            ? [
                { text: 'A qualidade do tecido me surpreendeu muito!', author: 'Amanda Silva' },
                { text: 'Achei sensacional o design das camisetas.', author: 'Bruno Fernandes' },
                { text: 'Excelente experiência de compra!', author: 'Lucas Pereira' },
              ]
            : comentarios.slice(0, 3)
          ).map((comment, i) => {
            const usuario = usuarios.find((u) => u.id === comment.usuarioId);
            const produto = produtos.find((p) => p.id === comment.produtoId);

            return (
              <div className="col-md-4 mb-4 comentarios__item" key={i}>
                <div className="p-4 bg-white shadow-sm rounded comentarios__box">
                  <p className="comentarios__text">"{comment?.texto || comment?.text}"</p>
                  <div className="d-flex align-items-center justify-content-center mt-3 gap-2">
                    <FaUserCircle size={36} className="text-secondary" />
                    <small className="comentarios__author fw-bold">
                      {usuario?.nomeCompleto || 'Usuário desconhecido'}
                    </small>
                  </div>
                  <div className="text-center mt-2">
                    <small className="comentarios__produto fst-italic text-muted">
                      Produto: {produto?.nome || 'Produto desconhecido'}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
