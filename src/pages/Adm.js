import React, { useEffect, useState } from 'react';
import { useProdutos } from '../hooks/useProdutos';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaBox } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './css/Adm.css';

const Adm = () => {
  const { listarProdutos } = useProdutos();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // evita atualizar estado se componente desmontar
    const fetchProdutos = async () => {
      try {
        const res = await listarProdutos();
        if (isMounted) setProdutos(res.data);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProdutos();

    return () => {
      isMounted = false;
    };
  }, []); // executa só uma vez ao montar

  const handleEditar = (id) => {
    navigate(`/editar-produto/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container adm-page py-5">
        <h1 className="text-center mb-4">Painel do Administrador</h1>
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button className="btn btn-success d-flex align-items-center gap-2" onClick={() => navigate('/produto-up')}>
            <FaPlusCircle /> Criar Produto
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => navigate('/colecoes-up')}>
            <FaBox /> Criar Coleção
          </button>
        </div>

        <h3 className="mt-5 mb-3">Lista de Produtos</h3>

        {loading ? (
          <p>Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <div className="row">
            {produtos.map((produto) => (
              <div key={produto.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={produto.imagemPrincipal || '/img/placeholder.jpg'}
                    alt={produto.nome}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">R$ {produto.preco.toFixed(2)}</p>
                    <button
                      className="btn btn-outline-secondary d-flex align-items-center gap-2"
                      onClick={() => handleEditar(produto.id)}
                    >
                      <FaEdit /> Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Adm;
