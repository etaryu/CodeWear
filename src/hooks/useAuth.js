import { useState, useEffect } from 'react';
import { useUsuarios } from './useUsuarios';

export const useAuth = () => {
  const { listarUsuarios } = useUsuarios();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, senha) => {
    try {
      const response = await listarUsuarios();
      const usuarioEncontrado = response.data.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuarioEncontrado) {
        setUser(usuarioEncontrado);
        localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
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
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
