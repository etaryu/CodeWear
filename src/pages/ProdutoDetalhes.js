import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './css/ProdutoDetalhes.css'; 

const ProdutoDetalhes = () => {
  return (
    <div>
      <Navbar />
      <section className="produto-page container py-5 mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="produto-imagem-principal mb-3">
              <img src="/img/redcamisa.jpg" alt="Produto" className="img-fluid rounded" />
            </div>
            <div className="produto-miniaturas d-flex gap-2">
              {[...Array(3)].map((_, i) => (
                <img key={i} src="/img/redcamisa.jpg" alt="Miniatura" className="img-thumbnail" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h1 className="produto-titulo">Camiseta Dev Vermelha</h1>
            <p className="produto-preco fw-bold h4 mt-3">R$ 89,90</p>

            <div className="produto-opcoes mt-4">
              <p className="fw-semibold">Tamanho:</p>
              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-outline-dark btn-sm">P</button>
                <button className="btn btn-outline-dark btn-sm">M</button>
                <button className="btn btn-outline-dark btn-sm">G</button>
              </div>

              <p className="fw-semibold">Cor:</p>
              <div className="d-flex gap-2 mb-4">
                <div className="cor-opcao bg-danger"></div>
                <div className="cor-opcao bg-dark"></div>
                <div className="cor-opcao bg-primary"></div>
              </div>
            </div>

            <button className="btn btn-dark w-100 py-2">Adicionar ao Carrinho</button>

            <div className="produto-descricao mt-5">
              <h5>Descrição</h5>
              <p>Uma camiseta pensada para devs que prezam por conforto e estilo no dia a dia do código. Ideal para todas as ocasiões tech!</p>
            </div>
          </div>
        </div>

        <div className="produtos-relacionados mt-5">
          <h3 className="text-center mb-4">Você também pode gostar</h3>
          <div className="row justify-content-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-6 col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src="/img/redcamisa.jpg" className="card-img-top" alt="Produto Relacionado" />
                  <div className="card-body text-center">
                    <h6 className="card-title">Camiseta Dev</h6>
                    <p className="card-text fw-bold">R$ 89,90</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProdutoDetalhes;
