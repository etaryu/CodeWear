import React, { useEffect, useState } from 'react';
import { useCarrinhos } from '../hooks/useCarrinhos';
import { useItensCarrinho } from '../hooks/useItensCarrinho';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Carrinho = () => {
  const { user } = useAuth();
  const { listarCarrinhos, criarCarrinho, finalizarCarrinho } = useCarrinhos();
  const { listarItensDeCarrinho, deletarItem } = useItensCarrinho();

  const [carrinhoAtual, setCarrinhoAtual] = useState(null);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchCarrinho = async () => {
      setLoading(true);
      const { data } = await listarCarrinhos();
      const naoFinalizado = data.find((c) => !c.finalizado && c.usuarioId === user.id);

      if (naoFinalizado) {
        setCarrinhoAtual(naoFinalizado);
        const { data: itensData } = await listarItensDeCarrinho(naoFinalizado.id);
        setItens(itensData);
      } else {
        // se não existir, cria carrinho novo
        const { data: novoCarrinho } = await criarCarrinho({
          usuarioId: user.id,
          finalizado: false,
        });
        setCarrinhoAtual(novoCarrinho);
        setItens([]);
      }
      setLoading(false);
    };

    if (user) fetchCarrinho();
  }, [user]);

  const handleRemoverItem = async (itemId) => {
    await deletarItem(itemId);
    const { data: itensData } = await listarItensDeCarrinho(carrinhoAtual.id);
    setItens(itensData);
  };

  const handleFinalizarCompra = async () => {
    await finalizarCarrinho(carrinhoAtual.id);
    setMensagem('Compra finalizada com sucesso!');
    setCarrinhoAtual(null);
    setItens([]);
  };

  if (loading) {
    return <div className="container py-5 text-center">Carregando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4">Seu Carrinho</h2>
        {mensagem && <div className="alert alert-success">{mensagem}</div>}
        {itens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="list-group mb-4">
              {itens.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.produtoNome}</h5>
                    <p className="mb-1">Qtd: {item.quantidade}</p>
                    <p className="mb-0">Preço: R$ {item.precoUnitario}</p>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoverItem(item.id)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <button className="btn btn-danger w-100" onClick={handleFinalizarCompra}>
              Finalizar Compra
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Carrinho;
