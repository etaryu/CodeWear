import api from '../services/api';

export const useItemCarrinho = () => {
  const listarItens = () => api.get('/itemcarrinho');

  const buscarItemPorId = (id) => api.get(`/itemcarrinho/${id}`);

  const criarItem = (data) => api.post('/itemcarrinho', data);

  const atualizarItem = (id, data) => api.put(`/itemcarrinho/${id}`, data);

  const deletarItem = (id) => api.delete(`/itemcarrinho/${id}`);

  const listarItensDoCarrinho = (carrinhoId) => api.get(`/carrinhos/${carrinhoId}/itens`);

  return {
    listarItens,
    buscarItemPorId,
    criarItem,
    atualizarItem,
    deletarItem,
    listarItensDoCarrinho,
  };
};
