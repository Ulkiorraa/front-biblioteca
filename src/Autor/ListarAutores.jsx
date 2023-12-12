import { useEffect, useState } from 'react';
import '../Listar.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const ListarAutores = ({ onEditarAutor, onDeletarAutor }) => {
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/autores')
            .then(response => {
                setAutores(response.data);
            })
            .catch(error => console.error("Erro ao buscar autores:", error));
    }, []);

    return (
        <div>
            <h1>Autores</h1>
            <ul>
                {autores.map(autor => (
                    <li key={autor.id}>
                        {autor.nome}
                        <button onClick={() => onEditarAutor(autor.id)}>Editar</button>
                        <button onClick={() => onDeletarAutor(autor.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

ListarAutores.propTypes = {
    onEditarAutor: PropTypes.func.isRequired,
    onDeletarAutor: PropTypes.func.isRequired
};

export default ListarAutores;
