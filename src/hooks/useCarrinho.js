import api from '../services/api';

export const useCarrinho = () => {
  const listarCarrinhos = () => api.get('/carrinhos');

  const buscarCarrinhoPorId = (id) => api.get(`/carrinhos/${id}`);

  const criarCarrinho = (usuarioId) => api.post(`/carrinhos/${usuarioId}`);

  const atualizarCarrinho = (id, data) => api.put(`/carrinhos/${id}`, data);

  const finalizarCarrinho = (id) => api.post(`/carrinhos/${id}/finalizar`);

  const listarCarrinhosDoUsuario = (usuarioId) =>
    api.get(`/usuarios/${usuarioId}/carrinhos`);

  return {
    listarCarrinhos,
    buscarCarrinhoPorId,
    criarCarrinho,
    atualizarCarrinho,
    finalizarCarrinho,
    listarCarrinhosDoUsuario,
  };
};
