import api from '../services/api';

export const useComentarios = () => {
  const listarComentarios = () => api.get('/comentarios');

  const buscarComentarioPorId = (id) => api.get(`/comentarios/${id}`);

  const criarComentario = (data) => api.post('/comentarios', data);

  const alterarComentario = (id, data) => api.put(`/comentarios/${id}`, data);

  const deletarComentario = (id) => api.delete(`/comentarios/${id}`);

  const listarComentariosDoProduto = (produtoId) =>
    api.get(`/comentarios/produto/${produtoId}`);

  return {
    listarComentarios,
    buscarComentarioPorId,
    criarComentario,
    alterarComentario,
    deletarComentario,
    listarComentariosDoProduto,
  };
};
