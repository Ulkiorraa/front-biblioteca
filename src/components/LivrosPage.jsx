import { useState, useEffect } from 'react';
import axios from 'axios';
import ListarLivros from '../Livro/ListarLivros';
import AdicionarEditarLivro from '../Livro/AdicionarEditarLivro';

function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const [livroAtual, setLivroAtual] = useState(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = () => {
    axios.get('http://localhost:8080/livros')
      .then(response => {
        setLivros(response.data);
      })
      .catch(error => console.error("Erro ao buscar livros:", error));
  };

  const handleEditarLivro = livroId => {
    setLivroAtual(livros.find(livro => livro.id === livroId));
  };

  const handleDeletarLivro = livroId => {
    axios.delete(`http://localhost:8080/livros/${livroId}`)
      .then(() => {
        carregarLivros();
        console.log("Livro deletado com sucesso!");
      })
      .catch(error => console.error("Erro ao deletar livro:", error));
  };

  const handleLivroSaved = () => {
    carregarLivros();
    setLivroAtual(null); // Limpa o livro atual para sair do modo de edição
  };

  return (
    <div>
      {livroAtual ? (
        <AdicionarEditarLivro 
          livroId={livroAtual.id} 
          onLivroSaved={handleLivroSaved} 
        />
      ) : (
        <button onClick={() => setLivroAtual({ titulo: '', isbn: '', autorId: '' })}>
          Adicionar Novo Livro
        </button>
      )}

      <ListarLivros 
        livros={livros}
        onEditarLivro={handleEditarLivro} 
        onDeletarLivro={handleDeletarLivro} 
      />
    </div>
  );
}

export default LivrosPage;