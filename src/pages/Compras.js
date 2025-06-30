import React, { useEffect, useState } from 'react';
import './css/Compras.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProdutos } from '../hooks/useProdutos';
import { useColecoes } from '../hooks/useColecoes';

const Compras = () => {
  const { listarProdutos } = useProdutos();
  const { listarColecoes } = useColecoes();

  const [produtos, setProdutos] = useState([]);
  const [colecoes, setColecoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colecaoSelecionada, setColecaoSelecionada] = useState(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProdutos, resColecoes] = await Promise.all([
          listarProdutos(),
          listarColecoes(),
        ]);
        setProdutos(resProdutos.data);
        setColecoes(resColecoes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const produtosFiltrados = produtos.filter((p) => {
    const matchColecao = colecaoSelecionada ? p.colecaoId === colecaoSelecionada : true;
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    return matchColecao && matchBusca;
  });

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
                <ul className="sidebar__list">
                  <li>
                    <button
                      className={`sidebar__item btn w-100 text-start ${colecaoSelecionada === null ? 'active' : ''}`}
                      onClick={() => setColecaoSelecionada(null)}
                    >
                      Todas as Coleções
                    </button>
                  </li>
                  {colecoes.map((colecao) => (
                    <li key={colecao.id}>
                      <button
                        className={`sidebar__item btn w-100 text-start ${colecaoSelecionada === colecao.id ? 'active' : ''}`}
                        onClick={() => setColecaoSelecionada(colecao.id)}
                      >
                        {colecao.nome}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Produtos */}
            <div className="col-md-9">
              <h2 className="comprar__title mb-4">
                {colecaoSelecionada
                  ? `Coleção: ${colecoes.find((c) => c.id === colecaoSelecionada)?.nome || ''}`
                  : 'Escolha seu Estilo'}
              </h2>

              <input
                type="text"
                className="form-control mb-4 pesquisa-produto"
                placeholder="Buscar por nome do produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              {loading ? (
                <p>Carregando produtos...</p>
              ) : produtosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                  {produtosFiltrados.map((produto) => (
                    <div className="col mb-4" key={produto.id}>
                      <div className="card h-100 shadow-sm rounded">
                        <img
                          src={produto.imagemPrincipal || '/img/redcamisa.jpg'}
                          className="card-img-top"
                          alt={produto.nome}
                          style={{ objectFit: 'cover', height: '250px' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{produto.nome}</h5>
                          
                          <p className="card-text fw-bold mb-4">
                            R$ {produto.preco.toFixed(2)}
                          </p>
                          <a
                            href={`/produto/${produto.id}`}
                            className="btn btn-dark mt-auto w-100"
                          >
                            Adicionar ao Carrinho
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum produto encontrado.</p>
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
