import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProdutos } from '../hooks/useProdutos';
import { useComentarios } from '../hooks/useComentarios';
import { useAuth } from '../hooks/useAuth';
import { useUsuarios } from '../hooks/useUsuarios';
import { useItemCarrinho } from '../hooks/useItemCarrinho';
import { useCarrinho } from '../hooks/useCarrinho';
import './css/ProdutoDetalhes.css';
import { FaUserCircle } from 'react-icons/fa';

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const { buscarProdutoPorIdComImagens } = useProdutos();
  const { listarComentariosDoProduto, criarComentario } = useComentarios();
  const { buscarUsuarioPorId } = useUsuarios();

  const [produto, setProduto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [imagens, setImagens] = useState([]);

  const [novoComentario, setNovoComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [quantidade, setQuantidade] = useState(1);

  const { criarCarrinho, listarCarrinhosDoUsuario } = useCarrinho();

  const [usuariosMap, setUsuariosMap] = useState({});

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const { produto, imagens } = await buscarProdutoPorIdComImagens(id);
        const imagensConvertidas = imagens.map(img => ({
          ...img,
          url: `data:${img.tipoMime};base64,${img.imagem}`,
        }));

        setProduto(produto);
        setImagens(imagensConvertidas);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
      }
    };

    const carregarComentariosEUsuarios = async () => {
      try {
        const resComentarios = await listarComentariosDoProduto(id);
        setComentarios(resComentarios.data);

        const idsUsuarios = [...new Set(resComentarios.data.map(c => c.usuarioId))];

        const promisesUsuarios = idsUsuarios.map(async (usuarioId) => {
          try {
            const resUsuario = await buscarUsuarioPorId(usuarioId);
            return { id: usuarioId, nomeCompleto: resUsuario.data.nomeCompleto };
          } catch {
            return { id: usuarioId, nomeCompleto: 'Usuário desconhecido' };
          }
        });

        const usuarios = await Promise.all(promisesUsuarios);

        const mapa = {};
        usuarios.forEach(({ id, nomeCompleto }) => {
          mapa[id] = nomeCompleto;
        });

        setUsuariosMap(mapa);
      } catch (err) {
        console.error('Erro ao buscar comentários ou usuários:', err);
      }
    };

    carregarProduto();
    carregarComentariosEUsuarios();
  }, [id]);

  const handleAdicionarAoCarrinho = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (quantidade < 1) {
      alert('A quantidade deve ser pelo menos 1.');
      return;
    }

    try {
      const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id;

      if (!userId) {
        alert('Usuário inválido. Faça login novamente.');
        navigate('/login');
        return;
      }

      // ⚠️ Não confia no localStorage — busca do backend
      let carrinhoId;

      const resCarrinhos = await listarCarrinhosDoUsuario(userId);
      const carrinhos = resCarrinhos.data || [];

      const carrinhoAberto = carrinhos.find(c => c.finalizado === false);

      if (carrinhoAberto) {
        carrinhoId = carrinhoAberto.id;
      } else {
        const resNovo = await criarCarrinho(userId);
        carrinhoId = resNovo.data.id;
      }

      // Agora sim salva no localStorage (pra uso futuro)
      localStorage.setItem('carrinhoId', carrinhoId);

      // Salva o item no localStorage temporariamente
      const carrinhoTemporario = JSON.parse(localStorage.getItem('carrinho')) || [];

      const indexExistente = carrinhoTemporario.findIndex(p => p.id === produto.id);

      if (indexExistente !== -1) {
        carrinhoTemporario[indexExistente].quantidade += quantidade;
      } else {
        carrinhoTemporario.push({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: imagens[0]?.url || null,
          quantidade,
        });
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinhoTemporario));

      navigate('/carrinho');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Não foi possível adicionar ao carrinho. Tente novamente.');
    }
  };

  const handleEnviarComentario = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!novoComentario.trim()) {
      alert('Digite um comentário antes de enviar.');
      return;
    }

    setEnviandoComentario(true);

    try {
      const data = {
        texto: novoComentario,
        usuarioId: user.id,
        produtoId: produto.id,
      };

      const response = await criarComentario(data);

      setComentarios(prev => [...prev, response.data]);

      setUsuariosMap(prev => ({
        ...prev,
        [user.id]: user.nomeCompleto || `Usuário ${user.id}`,
      }));

      setNovoComentario('');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      alert('Erro ao enviar comentário. Tente novamente.');
    } finally {
      setEnviandoComentario(false);
    }
  };

  if (!produto) {
    return <div className="text-center mt-5">Carregando...</div>;
  }

  return (
    <div>
      <Navbar />
      <section className="produto-page container py-5 mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="produto-imagem-principal mb-3">
              <img
                src={imagens[0]?.url || '/img/default.jpg'}
                alt={produto.nome}
                className="img-fluid rounded"
              />
            </div>
            <div className="produto-miniaturas d-flex gap-2">
              {(imagens.length > 0 ? imagens : [...Array(3)]).map((img, i) => (
                <img
                  key={i}
                  src={img?.url || '/img/default.jpg'}
                  alt={`Miniatura ${i}`}
                  className="img-thumbnail"
                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h1 className="produto-titulo">{produto.nome}</h1>
            <p className="produto-tipo text-muted">{produto.tipoProduto}</p>
            <p className="produto-preco fw-bold h4 mt-3">
              R$ {produto.preco.toFixed(2)}
            </p>

            <div className="mb-3">
              <label htmlFor="quantidade" className="form-label">Quantidade</label>
              <input
                type="number"
                id="quantidade"
                className="form-control"
                min={1}
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
              />
            </div>

            <button className="btn btn-dark w-100 py-2" onClick={handleAdicionarAoCarrinho}>
              Adicionar ao Carrinho
            </button>

            <div className="produto-descricao mt-5">
              <h5>Descrição</h5>
              <p>
                {produto.nome} é um(a) {produto.tipoProduto.toLowerCase()} de alta qualidade. Garanta já o seu!
              </p>
            </div>
          </div>
        </div>

        <div className="comentarios mt-5">
          <h3 className="text-center mb-4">Comentários</h3>

          <div className="mb-4">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Escreva seu comentário..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              disabled={enviandoComentario}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleEnviarComentario}
              disabled={enviandoComentario}
            >
              {enviandoComentario ? 'Enviando...' : 'Enviar Comentário'}
            </button>
          </div>

          <div className="row">
            {comentarios.length === 0 ? (
              <p className="text-center">Nenhum comentário ainda.</p>
            ) : (
              comentarios.map((comentario, i) => (
                <div key={i} className="col-md-4 mb-4 comentarios__item">
                  <div className="p-4 bg-white shadow-sm rounded comentarios__box">
                    <p className="comentarios__text">"{comentario.texto}"</p>
                    <div className="d-flex align-items-center justify-content-center mt-3 gap-2">
                      <FaUserCircle size={36} className="text-secondary" />
                      <small className="comentarios__author fw-bold">
                        {usuariosMap[comentario.usuarioId] || `Usuário ${comentario.usuarioId}`}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProdutoDetalhes;
