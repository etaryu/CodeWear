import React, { useEffect, useState } from 'react';
import { useItensCarrinho } from '../hooks/useItensCarrinho';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PedidoDetalhe = () => {
  const { id } = useParams();
  const { listarItensDeCarrinho } = useItensCarrinho();

  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItens = async () => {
      const { data } = await listarItensDeCarrinho(id);
      setItens(data);
      setLoading(false);
    };

    fetchItens();
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center">Carregando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4">Detalhes do Pedido #{id}</h2>
        {itens.length === 0 ? (
          <p>Não foi possível encontrar itens para este pedido.</p>
        ) : (
          <ul className="list-group">
            {itens.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.produtoNome}</h5>
                  <p className="mb-1">Qtd: {item.quantidade}</p>
                  <p className="mb-0">Preço: R$ {item.precoUnitario}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PedidoDetalhe;
