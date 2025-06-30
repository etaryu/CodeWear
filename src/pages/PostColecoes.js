// src/pages/PostColecoes.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useColecoes } from '../hooks/useColecoes';
import { FiTag, FiAlignLeft, FiSave } from 'react-icons/fi';
import './css/PostColecoes.css';

const PostColecoes = () => {
  const { criarColecao } = useColecoes();

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
  });

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      await criarColecao(form);
      setMensagem('✅ Coleção criada com sucesso!');
      setForm({ nome: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao criar coleção:', error);
      setMensagem('❌ Erro ao criar coleção.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Cadastrar Nova Coleção</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            <FiTag style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Nome da Coleção
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome da coleção"
            value={form.nome}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label htmlFor="descricao" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            <FiAlignLeft style={{ marginRight: 8 }} />
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Descrição da coleção"
            value={form.descricao}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : <>
              <FiSave style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Criar Coleção
            </>}
          </button>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
      <Footer />
    </>
  );
};

export default PostColecoes;
