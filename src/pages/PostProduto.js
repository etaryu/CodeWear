import { useState, useEffect } from 'react';
import { useProdutos } from '../hooks/useProdutos';
import { useColecoes } from '../hooks/useColecoes';
import Navbar from '../components/Navbar';
import './css/PostProduto.css';
import { FiBox, FiTag, FiDollarSign, FiImage, FiHash, FiUpload } from 'react-icons/fi';

const PostProduto = () => {
  const { criarProduto, uploadImagemProduto } = useProdutos();
  const { listarColecoes } = useColecoes();

  const [colecoes, setColecoes] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    tipoProduto: '',
    preco: '',
    colecaoId: '',
    descricaoImagem: '',
    imagem: null,
  });
  const [mensagem, setMensagem] = useState('');
  const [preview, setPreview] = useState(null);

  // Buscar coleções ao montar o componente
  useEffect(() => {
    const carregarColecoes = async () => {
      try {
        const res = await listarColecoes();
        setColecoes(res.data);
      } catch (error) {
        console.error('Erro ao carregar coleções:', error);
      }
    };
    carregarColecoes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      const file = files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setPreview(imageURL);
      }
      setForm((prev) => ({ ...prev, imagem: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const produtoPayload = {
        nome: form.nome,
        tipoProduto: form.tipoProduto,
        preco: parseFloat(form.preco),
        colecaoId: parseInt(form.colecaoId),
      };

      const resProduto = await criarProduto(produtoPayload);
      const novoProduto = resProduto.data;

      if (form.imagem) {
        await uploadImagemProduto({
          imagem: form.imagem,
          descricao: form.descricaoImagem,
          produtoId: novoProduto.id,
        });
      }

      setMensagem('✅ Produto criado com sucesso!');
      setForm({
        nome: '',
        tipoProduto: '',
        preco: '',
        colecaoId: '',
        descricaoImagem: '',
        imagem: null,
      });
      setPreview(null);
      document.getElementById('upload-imagem').value = '';
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setMensagem('❌ Erro ao criar produto.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2><FiBox /> Cadastrar Novo Produto</h2>
        <form onSubmit={handleSubmit} className="form-produto">
          <label><FiTag /> Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label><FiUpload /> Upload de Imagem</label>
          <div className="upload-box" onClick={() => document.getElementById('upload-imagem').click()}>
            <p>Clique para selecionar uma imagem</p>
            <p style={{ fontSize: '12px', color: '#777' }}>Imagens devem ter menos de 2MB</p>
          </div>
          <input
            type="file"
            id="upload-imagem"
            name="imagem"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChange}
          />

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Pré-visualização" className="preview-image" />
            </div>
          )}

          <div className="linha-dupla">
            <div>
              <label><FiBox /> Tipo do Produto</label>
              <input
                type="text"
                name="tipoProduto"
                placeholder="Tipo de produto"
                value={form.tipoProduto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label><FiDollarSign /> Preço</label>
              <input
                type="number"
                name="preco"
                placeholder="Preço"
                value={form.preco || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label><FiHash /> Coleção</label>
          <select
            name="colecaoId"
            value={form.colecaoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma coleção</option>
            {colecoes.map((colecao) => (
              <option key={colecao.id} value={colecao.id}>
                {colecao.nome}
              </option>
            ))}
          </select>

          <label><FiImage /> Descrição da Imagem</label>
          <textarea
            name="descricaoImagem"
            placeholder="Descreva a imagem do produto..."
            value={form.descricaoImagem}
            onChange={handleChange}
            rows={4}
          />

          <button type="submit">Criar Produto</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </>
  );
};

export default PostProduto;
