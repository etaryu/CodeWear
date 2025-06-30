import api from '../services/api';

export const useColecoes = () => {
  const listarColecoes = () => api.get('/colecoes');

  const buscarColecaoPorId = (id) => api.get(`/colecoes/${id}`);

  const criarColecao = (data) => api.post('/colecoes', data);

  const alterarColecao = (id, data) => api.put(`/colecoes/${id}`, data);

  const deletarColecao = (id) => api.delete(`/colecoes/${id}`);

  return {
    listarColecoes,
    buscarColecaoPorId,
    criarColecao,
    alterarColecao,
    deletarColecao,
  };
};
