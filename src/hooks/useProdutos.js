import api from '../services/api';

export const useProdutos = () => {
  // Cache interno para os produtos com imagens
  let cacheProdutosComImagem = null;

  const listarProdutos = async () => {
    if (cacheProdutosComImagem) {
      return { data: cacheProdutosComImagem };
    }

    const res = await api.get('/produtos');
    const produtos = res.data;

    const produtosComImagem = await Promise.all(
      produtos.map(async (produto) => {
        try {
          const resImagens = await api.get(`/produtos/${produto.id}/imagens`);
          const imagens = resImagens.data;

          let imagemPrincipal = null;

          if (imagens.length > 0 && imagens[0].imagem) {
            imagemPrincipal = `data:${imagens[0].tipoMime};base64,${imagens[0].imagem}`;
          }

          return {
            ...produto,
            imagemPrincipal,
          };
        } catch (err) {
          console.error(`Erro ao buscar imagem do produto ${produto.id}:`, err);
          return {
            ...produto,
            imagemPrincipal: null,
          };
        }
      })
    );

    cacheProdutosComImagem = produtosComImagem;
    return { data: produtosComImagem };
  };

  // As demais funções continuam iguais

  const buscarProdutoPorId = (id) => api.get(`/produtos/${id}`);

  const buscarProdutoPorIdComImagens = async (id) => {
    const [produtoRes, imagensRes] = await Promise.all([
      api.get(`/produtos/${id}`),
      api.get(`/produtos/${id}/imagens`)
    ]);

    return {
      produto: produtoRes.data,
      imagens: imagensRes.data
    };
  };

  const criarProduto = (data) => api.post('/produtos', data);

  const alterarProduto = (id, data) => api.put(`/produtos/${id}`, data);

  const deletarProduto = (id) => api.delete(`/produtos/${id}`);

  const listarComentariosDoProduto = (id) => api.get(`/produtos/${id}/comentarios`);

  const listarImagensDoProduto = (id) => api.get(`/produtos/${id}/imagens`);

  const uploadImagemProduto = ({ imagem, descricao, produtoId }) => {
    const formData = new FormData();
    formData.append('Imagem', imagem);
    formData.append('Descricao', descricao);
    formData.append('ProdutoId', produtoId);

    return api.post('/imagensProduto/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    listarProdutos,
    buscarProdutoPorId,
    buscarProdutoPorIdComImagens,
    criarProduto,
    alterarProduto,
    deletarProduto,
    listarComentariosDoProduto,
    listarImagensDoProduto,
    uploadImagemProduto,
  };
};
