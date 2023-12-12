import { useEffect, useState } from 'react';
import '../Listar.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const ListarLivros = ({onEditarLivro, onDeletarLivro}) => {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/livros')
            .then(response => {
                setLivros(response.data);
            })
            .catch(error => console.error("Erro ao buscar livros:", error));
    }, []);

    return (
        <div>
            <h1>Livros Disponíveis</h1>
            <ul>
                {livros.map(livro => (
                    <li key={livro.id}>{livro.titulo} - {livro.nomeAutor}
                    <button onClick={() => onEditarLivro(livro.id)}>Editar</button>
                    <button onClick={() => onDeletarLivro(livro.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

ListarLivros.propTypes = {
    onEditarLivro: PropTypes.func.isRequired,
    onDeletarLivro: PropTypes.func.isRequired
};

export default ListarLivros;