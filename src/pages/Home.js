import React from 'react';
import './css/Home.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';

const HeroSection = () => (
  <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white">
    <h1 className="hero-section__title">
      <span className="text-danger">Deploy</span> de conforto, <span className="text-danger">commit</span> de autenticidade!
    </h1>
    <p className="hero-section__subtitle lead mt-3"><span className="text-danger">Na CodeWear</span>, acreditamos que programar vai além do código – é sobre expressão, conforto e identidade. Criamos roupas para <span className="text-danger">devs</span> que valorizam estilo sem abrir mão da praticidade, seja no home office, no escritório ou em eventos tech. Nosso objetivo é redefinir o <span className="text-danger">dress code</span> da programação, trazendo peças que combinam inovação e cultura geek com um toque moderno.</p>
    <a href="/compras" className="btn btn-danger mt-4 px-5 py-3 fs-5 rounded-pill">
      Ver Produtos
    </a>
  </section>
);

const NovaColecao = () => (
  <section id="nova-colecao" className="nova-colecao py-5 text-center">
    <h2 className="nova-colecao__title">Nova Coleção</h2>
    <div className="container">
      <div className="row justify-content-center mt-4 nova-colecao__list">
        {[...Array(4)].map((_, i) => (
          <div className="col-6 col-md-3 mb-4 nova-colecao__item" key={i}>
            <div className="nova-colecao__image-container">
              <img 
                src='/img/redcamisa.jpg' 
                alt="Camiseta" 
                className="img-fluid nova-colecao__image" 
              />
            </div>
            <div className="nova-colecao__name">
              <p className="nova-colecao__text">Camiseta Dev Vermelha</p>
            </div>
            <div className="nova-colecao__price">
              <p className="nova-colecao__text">R$ 89,90</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const Colecoes = () => (
    <section id="colecoes" className="colecoes py-5 bg-light text-center">
      <h2 className="colecoes__title">Coleções</h2>
      <div className="row justify-content-center mt-4 colecoes__list">
        <div className="col-6 col-md-3 mb-4 colecoes__item">
          <img src="/img/java.jpg" alt="Java" className="img-fluid colecoes__image" />
          <p className="colecoes__text">Java</p>
        </div>
  
        <div className="col-6 col-md-3 mb-4 colecoes__item">
          <img src="/img/JavaScript.jpg" alt="JavaScript" className="img-fluid colecoes__image" />
          <p className="colecoes__text"> JavaScript</p>
        </div>
  
        <div className="col-6 col-md-3 mb-4 colecoes__item">
          <img src="/img/python.jpg" alt="Python" className="img-fluid colecoes__image" />
          <p className="colecoes__text">Python</p>
        </div>
      </div>
    </section>
  );
  
  
const MaisVendidos = () => (
    <section id="mais-vendidos" className="mais-vendidos py-5 text-center">
      <h2 className="mais-vendidos__title">Mais Vendidos</h2>
      <div className="container">
        <div className="row justify-content-center mt-4 mais-vendidos__list">
          {[...Array(8)].map((_, i) => (
            <div className="col-6 col-md-3 mb-4 mais-vendidos__item" key={i}>
              <img src="/img/redcamisa.jpg" alt="Mais Vendido" className="img-fluid mais-vendidos__image" />
              <p className="mais-vendidos__text">Camiseta Dev Vermelha</p>
              <p className="mais-vendidos__price">R$ 89,90</p> 
            </div>
          ))}
        </div>
      </div>
    </section>
);

  
const Comentarios = () => (
    <section id="comentarios" className="comentarios py-5 bg-light text-center">
      <h2 className="comentarios__title mb-5">Comentários em Destaque</h2>
      <div className="row justify-content-center comentarios__list">
  
        <div className="col-md-4 mb-4 comentarios__item">
          <div className="p-4 bg-white shadow-sm rounded comentarios__box">
            <p className="comentarios__text">
              "A qualidade do tecido me surpreendeu muito! É leve, resistente e super confortável para usar no dia a dia. Já quero mais modelos!"
            </p>
            <div className="d-flex align-items-center justify-content-center mt-3 gap-2">
              <FaUserCircle size={36} className="text-secondary" />
              <small className="comentarios__author fw-bold">Amanda Silva</small>
            </div>
          </div>
        </div>
  
        <div className="col-md-4 mb-4 comentarios__item">
          <div className="p-4 bg-white shadow-sm rounded comentarios__box">
            <p className="comentarios__text">
              "Achei sensacional o design das camisetas. Realmente combina com meu estilo dev e ainda por cima é muito confortável."
            </p>
            <div className="d-flex align-items-center justify-content-center mt-3 gap-2">
              <FaUserCircle size={36} className="text-secondary" />
              <small className="comentarios__author fw-bold">Bruno Fernandes</small>
            </div>
          </div>
        </div>
  
        <div className="col-md-4 mb-4 comentarios__item">
          <div className="p-4 bg-white shadow-sm rounded comentarios__box">
            <p className="comentarios__text">
              "Excelente experiência de compra! Atendimento rápido, entrega antes do prazo e produto veio muito bem embalado. Recomendo demais."
            </p>
            <div className="d-flex align-items-center justify-content-center mt-3 gap-2">
              <FaUserCircle size={36} className="text-secondary" />
              <small className="comentarios__author fw-bold">Lucas Pereira</small>
            </div>
          </div>
        </div>
  
      </div>
    </section>
);
  

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <NovaColecao />
    <Colecoes/>
    <MaisVendidos/>
    <Comentarios/>
    <Footer />
  </div>
);

export default Home;
