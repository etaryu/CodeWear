import api from '../services/api';

export const useUsuarios = () => {
  const listarUsuarios = () => api.get('/usuarios');

  const buscarUsuarioPorId = (id) => api.get(`/usuarios/${id}`);

  const criarUsuario = (data) => api.post('/usuarios', data);

  const atualizarUsuario = (id, data) => api.put(`/usuarios/${id}`, data);

  const deletarUsuario = (id) => api.delete(`/usuarios/${id}`);

  const listarCarrinhosDoUsuario = (id) => api.get(`/usuarios/${id}/carrinhos`);

  return {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    listarCarrinhosDoUsuario,
  };
};
