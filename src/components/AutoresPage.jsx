import { useState, useEffect } from 'react';
import axios from 'axios';
import ListarAutores from '../Autor/ListarAutores';
import AdicionarEditarAutor from '../Autor/AdicionarEditarAutor';

function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [autorAtual, setAutorAtual] = useState(null);

  useEffect(() => {
    carregarAutores();
  }, []);

  const carregarAutores = () => {
    axios.get('http://localhost:8080/autores')
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => console.error("Erro ao buscar autores:", error));
  };

  const handleEditarAutor = autorId => {
    setAutorAtual(autores.find(autor => autor.id === autorId));
  };

  const handleDeletarAutor = autorId => {
    axios.delete(`http://localhost:8080/autores/${autorId}`)
      .then(() => {
        carregarAutores();
        console.log("Autor deletado com sucesso!");
      })
      .catch(error => console.error("Erro ao deletar autor:", error));
  };

  const handleAutorSaved = () => {
    carregarAutores();
    setAutorAtual(null); // Limpa o autor atual para sair do modo de edição
  };

  return (
    <div>
      {autorAtual ? (
        <AdicionarEditarAutor 
          autorId={autorAtual.id} 
          onAutorSaved={handleAutorSaved} 
        />
      ) : (
        <button onClick={() => setAutorAtual({ nome: '' })}>Adicionar Novo Autor</button>
      )}

      <ListarAutores 
        autores={autores}
        onEditarAutor={handleEditarAutor} 
        onDeletarAutor={handleDeletarAutor} 
      />
    </div>
  );
}

export default AutoresPage;
