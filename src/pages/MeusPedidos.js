import React, { useEffect, useState } from 'react';
import { useCarrinhos } from '../hooks/useCarrinhos';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const MeusPedidos = () => {
  const { user } = useAuth();
  const { listarComprasFinalizadasPorUsuario } = useCarrinhos();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data } = await listarComprasFinalizadasPorUsuario(user.id);
      setPedidos(data);
      setLoading(false);
    };

    if (user) fetchPedidos();
  }, [user]);

  if (loading) {
    return <div className="container py-5 text-center">Carregando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4">Meus Pedidos</h2>
        {pedidos.length === 0 ? (
          <p>Você ainda não fez nenhuma compra.</p>
        ) : (
          <ul className="list-group">
            {pedidos.map((pedido) => (
              <li key={pedido.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>Pedido #{pedido.id}</h5>
                  <p className="mb-0">Data: {new Date(pedido.dataFinalizacao).toLocaleDateString()}</p>
                </div>
                <Link to={`/meus-pedidos/${pedido.id}`} className="btn btn-outline-secondary btn-sm">
                  Ver Detalhes
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MeusPedidos;
