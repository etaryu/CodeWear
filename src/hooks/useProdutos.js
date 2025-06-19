import api from '../services/api';

export const useProdutos = () => {
  const listarProdutos = () => api.get('/produtos');

  const buscarProdutoPorId = (id) => api.get(`/produtos/${id}`);

  const criarProduto = (data) => api.post('/produtos', data);

  const alterarProduto = (id, data) => api.put(`/produtos/${id}`, data);

  const deletarProduto = (id) => api.delete(`/produtos/${id}`);

  const listarComentariosDoProduto = (id) => api.get(`/produtos/${id}/comentarios`);

  const listarImagensDoProduto = (id) => api.get(`/produtos/${id}/imagens`);

  return {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    alterarProduto,
    deletarProduto,
    listarComentariosDoProduto,
    listarImagensDoProduto,
  };
};
