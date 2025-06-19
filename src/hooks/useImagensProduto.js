import api from '../services/api';

export const useImagensProduto = () => {
  const listarImagensDoProduto = (produtoId) =>
    api.get(`/produtos/${produtoId}/imagens`);

  const adicionarImagemAoProduto = (produtoId, data) =>
    api.post(`/produtos/${produtoId}/imagens`, data);

  const deletarImagem = (imagemId) => api.delete(`/imagens/${imagemId}`);

  return {
    listarImagensDoProduto,
    adicionarImagemAoProduto,
    deletarImagem,
  };
};
