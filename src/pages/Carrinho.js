import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';
import { useItemCarrinho } from '../hooks/useItemCarrinho';
import { useProdutos } from '../hooks/useProdutos';
import './css/Carrinho.css';

const Carrinho = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { finalizarCarrinho, listarCarrinhosDoUsuario } = useCarrinho();
  const { criarItem, listarItensDoCarrinho, atualizarItem, deletarItem } = useItemCarrinho();
  const { buscarProdutoPorIdComImagens } = useProdutos();

  const [itensTemporarios, setItensTemporarios] = useState([]);
  const [carrinhoId, setCarrinhoId] = useState(null);
  const [itensBackend, setItensBackend] = useState([]);
  const [itensBackendComProdutos, setItensBackendComProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const montarItensBackendComProdutos = async (itens) => {
    try {
      const itensComProdutos = await Promise.all(
        itens.map(async (item) => {
          const { produto, imagens } = await buscarProdutoPorIdComImagens(item.produtoId);
          const imagemPrincipal =
            imagens.length > 0 && imagens[0].imagem
              ? `data:${imagens[0].tipoMime};base64,${imagens[0].imagem}`
              : null;

          return {
            ...item,
            nome: produto.nome,
            precoUnitario: produto.preco,
            imagem: imagemPrincipal,
          };
        })
      );
      setItensBackendComProdutos(itensComProdutos);
    } catch (err) {
      console.error('Erro ao montar itens backend com produtos:', err);
      setItensBackendComProdutos([]);
    }
  };

  const fetchItensBackend = async (id) => {
    try {
      const res = await listarItensDoCarrinho(id);
      const itens = res.data || [];
      setItensBackend(itens);
      await montarItensBackendComProdutos(itens);
    } catch (err) {
      console.error('Erro ao buscar itens do carrinho backend:', err);
      setItensBackend([]);
      setItensBackendComProdutos([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id;
      const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
      setItensTemporarios(carrinhoSalvo);

      let carrinhoIdLocal = null;

      if (userId) {
        try {
          const res = await listarCarrinhosDoUsuario(userId);
          const carrinhoAberto = res.data.find((c) => !c.finalizado);

          if (carrinhoAberto) {
            carrinhoIdLocal = carrinhoAberto.id;
            localStorage.setItem('carrinhoId', carrinhoIdLocal);
          } else {
            localStorage.removeItem('carrinhoId');
          }
        } catch (err) {
          console.error('Erro ao listar carrinhos do usuário:', err);
          localStorage.removeItem('carrinhoId');
        }
      }

      if (carrinhoIdLocal) {
        setCarrinhoId(carrinhoIdLocal);
        await fetchItensBackend(carrinhoIdLocal);
      }

      setLoading(false);
    };

    init();
  }, [isAuthenticated, navigate, user]);

  const totalTemporarios = itensTemporarios.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const totalBackend = itensBackendComProdutos.reduce(
    (acc, item) => acc + (item.precoUnitario ?? 0) * (item.quantidade ?? 0),
    0
  );

  const handleEnviarAoCarrinho = async () => {
    try {
      if (!carrinhoId) {
        alert('Carrinho ainda não foi criado.');
        return;
      }

      const resItensBackend = await listarItensDoCarrinho(carrinhoId);
      const backendItems = resItensBackend.data || [];

      for (const itemLocal of itensTemporarios) {
        const itemBackend = backendItems.find(i => i.produtoId === itemLocal.id);
        if (itemBackend) {
          const novaQtd = itemBackend.quantidade + itemLocal.quantidade;
          await atualizarItem(itemBackend.id, { ...itemBackend, quantidade: novaQtd });
        } else {
          await criarItem({
            carrinhoId,
            produtoId: itemLocal.id,
            quantidade: itemLocal.quantidade,
            precoUnitario: itemLocal.preco,
          });
        }
      }

      await fetchItensBackend(carrinhoId);
      setItensTemporarios([]);
      localStorage.removeItem('carrinho');

      alert('Itens enviados ao carrinho real com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar itens ao carrinho:', err);
      alert('Erro ao enviar ao carrinho.');
    }
  };

  const handleRemoverItemBackend = async (itemId) => {
    try {
      await deletarItem(itemId);
      await fetchItensBackend(carrinhoId);
    } catch (err) {
      console.error('Erro ao remover item do carrinho real:', err);
      alert('Erro ao remover item do carrinho.');
    }
  };

  const handleRemoverItemTemporario = (produtoId) => {
    const novosItens = itensTemporarios.filter((item) => item.id !== produtoId);
    setItensTemporarios(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const handleFinalizarCompra = async () => {
    try {
      if (!carrinhoId || itensBackend.length === 0) {
        alert('Adicione produtos ao carrinho antes de finalizar.');
        return;
      }

      await finalizarCarrinho(carrinhoId);
      alert('Compra finalizada com sucesso!');
      localStorage.removeItem('carrinho');
      localStorage.removeItem('carrinhoId');
      setItensBackend([]);
      setItensBackendComProdutos([]);
      navigate('/');
    } catch (err) {
      console.error('Erro ao finalizar compra:', err);
      alert('Erro ao finalizar compra.');
    }
  };

  if (loading) return <div className="carrinho-loading">Carregando...</div>;

  return (
    <div>
      <Navbar />
      <div className="cart-page container">
        <div className="cart-items">
          <h2>Itens no Carrinho Temporário</h2>
          {itensTemporarios.length > 0 ? (
            itensTemporarios.map((item, i) => (
              <div key={`temp-${i}`} className="cart-item">
                <img src={item.imagem || '/img/default.jpg'} alt={item.nome} />
                <div className="item-details">
                  <h5>{item.nome}</h5>
                  <p>Qtd: {item.quantidade}</p>
                  <p>Unitário: R$ {item.preco.toFixed(2)}</p>
                  <p>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => handleRemoverItemTemporario(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Não há itens no carrinho temporário.</p>
          )}

          <div className="summary-line">
            <strong>Total:</strong> R$ {totalTemporarios.toFixed(2)}
          </div>

          <button
            className="btn btn-dark w-100 my-3"
            onClick={handleEnviarAoCarrinho}
            disabled={itensTemporarios.length === 0}
          >
            Enviar ao Carrinho Real
          </button>

          <hr />

          <h2>Itens no Carrinho Real</h2>
          {itensBackendComProdutos.length > 0 ? (
            itensBackendComProdutos.map((item, i) => (
              <div key={`backend-${i}`} className="cart-item">
                <img src={item.imagem || '/img/default.jpg'} alt={item.nome} />
                <div className="item-details">
                  <h5>{item.nome}</h5>
                  <p>Qtd: {item.quantidade}</p>
                  <p>Unitário: R$ {(item.precoUnitario ?? 0).toFixed(2)}</p>
                  <p>Total: R$ {((item.precoUnitario ?? 0) * (item.quantidade ?? 0)).toFixed(2)}</p>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => handleRemoverItemBackend(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Não há itens no carrinho real.</p>
          )}
        </div>

        <div className="cart-summary">
          <h3>Resumo da Compra</h3>
          <div className="summary-row">
            <span>Temporário:</span>
            <span>R$ {totalTemporarios.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Backend:</span>
            <span>R$ {totalBackend.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total Geral:</span>
            <span>R$ {(totalTemporarios + totalBackend).toFixed(2)}</span>
          </div>

          <button
            className="btn-checkout"
            onClick={handleFinalizarCompra}
            disabled={itensBackend.length === 0}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Carrinho;
