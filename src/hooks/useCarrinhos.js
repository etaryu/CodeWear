import api from '../services/api';

export const useCarrinhos = () => {
  const listarCarrinhos = () => api.get('/carrinhos');

  const buscarCarrinhoPorId = (id) => api.get(`/carrinhos/${id}`);

  const criarCarrinho = (data) => api.post('/carrinhos', data);

  const alterarCarrinho = (id, data) => api.put(`/carrinhos/${id}`, data);

  const deletarCarrinho = (id) => api.delete(`/carrinhos/${id}`);

  const finalizarCarrinho = (id) => api.post(`/carrinhos/${id}/finalizar`);

  const listarComprasFinalizadasPorUsuario = (userId) =>
    api.get(`/carrinhos/usuario/${userId}?finalizado=true`);

  return {
    listarCarrinhos,
    buscarCarrinhoPorId,
    criarCarrinho,
    alterarCarrinho,
    deletarCarrinho,
    finalizarCarrinho,
    listarComprasFinalizadasPorUsuario,
  };
};
