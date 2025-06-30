import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProdutos } from '../hooks/useProdutos';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './css/EditarProduto.css';

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    buscarProdutoPorIdComImagens,
    alterarProduto,
    uploadImagemProduto
  } = useProdutos();

  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
  });
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);
  const [novaDescricaoImagem, setNovaDescricaoImagem] = useState('');

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        const { produto, imagens } = await buscarProdutoPorIdComImagens(id);
        setProduto({
          nome: produto.nome || '',
          descricao: produto.descricao || '',
          preco: produto.preco ? produto.preco.toString() : '',
        });
        setImagens(imagens || []);
      } catch (err) {
        setErro('Erro ao carregar dados do produto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalvar = async () => {
    setErro(null);
    setSalvando(true);
    try {
      const precoNum = parseFloat(produto.preco.replace(',', '.'));
      if (isNaN(precoNum)) {
        setErro('Preço inválido.');
        setSalvando(false);
        return;
      }

      await alterarProduto(id, {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: precoNum,
      });

      if (novaImagem) {
        await uploadImagemProduto({
          imagem: novaImagem,
          descricao: novaDescricaoImagem,
          produtoId: id,
        });
      }

      alert('Produto atualizado com sucesso!');
      navigate('/adm');
    } catch (err) {
      setErro('Erro ao salvar produto.');
      console.error(err);
    } finally {
      setSalvando(false);
    }
  };

  const handleImagemChange = (e) => {
    if (e.target.files.length > 0) {
      setNovaImagem(e.target.files[0]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5 editar-produto-page">
        <h1 className="mb-4 text-center">Editar Produto</h1>

        {loading ? (
          <p>Carregando produto...</p>
        ) : erro ? (
          <p className="text-danger">{erro}</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSalvar();
            }}
            className="editar-produto-form"
          >
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="form-control"
                value={produto.nome}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="preco" className="form-label">
                Preço (R$)
              </label>
              <input
                type="text"
                id="preco"
                name="preco"
                className="form-control"
                value={produto.preco}
                onChange={handleChange}
                required
                pattern="^\d+(\.\d{1,2})?$"
                title="Digite um preço válido. Exemplo: 199.99"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Imagens atuais:</label>
              <div className="d-flex gap-3 flex-wrap">
                {imagens.length === 0 && <p>Nenhuma imagem cadastrada.</p>}
                {imagens.map((img) => (
                  <div key={img.id} className="imagem-card">
                    <img
                      src={`data:${img.tipoMime};base64,${img.imagem}`}
                      alt={img.descricao || 'Imagem do produto'}
                      className="img-thumbnail"
                    />
                    <small>{img.descricao}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="novaImagem" className="form-label">
                Adicionar nova imagem
              </label>
              <input
                type="file"
                id="novaImagem"
                accept="image/*"
                className="form-control"
                onChange={handleImagemChange}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Descrição da nova imagem"
                value={novaDescricaoImagem}
                onChange={(e) => setNovaDescricaoImagem(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={salvando}
            >
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditarProduto;
