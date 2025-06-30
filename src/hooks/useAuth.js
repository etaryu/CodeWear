import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORTADO PARA REDIRECIONAR
import { useUsuarios } from './useUsuarios';

export const useAuth = () => {
  const { listarUsuarios, autenticarUsuarioPorId } = useUsuarios();
  const navigate = useNavigate(); // Hook do React Router

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, senha) => {
    try {
      const response = await listarUsuarios();
      const usuarioParcial = response.data.find((u) => u.email === email);
      if (!usuarioParcial) return false;

      const respostaAutenticacao = await autenticarUsuarioPorId(usuarioParcial.id);
      const usuarioAutenticado = respostaAutenticacao.data;

      if (usuarioAutenticado.senha === senha) {
        setUser(usuarioAutenticado);
        localStorage.setItem('user', JSON.stringify(usuarioAutenticado));

        // Se for admin, redireciona para /adm
        if (usuarioAutenticado.roleId === 2) {
          navigate('/adm');
        } else {
          navigate('/');
        }

        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Erro no login:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); 
    navigate('/'); 
  };


  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
