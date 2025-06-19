import api from '../services/api';

export const useItensCarrinho = () => {
  const listarItensCarrinho = () => api.get('/itemcarrinho');

  const buscarItemPorId = (id) => api.get(`/itemcarrinho/${id}`);

  const adicionarItem = (data) => api.post('/itemcarrinho', data);

  const alterarItem = (id, data) => api.put(`/itemcarrinho/${id}`, data);

  const deletarItem = (id) => api.delete(`/itemcarrinho/${id}`);

  const listarItensDeCarrinho = (carrinhoId) => api.get(`/carrinhos/${carrinhoId}/itens`);

  return {
    listarItensCarrinho,
    buscarItemPorId,
    adicionarItem,
    alterarItem,
    deletarItem,
    listarItensDeCarrinho,
  };
};
