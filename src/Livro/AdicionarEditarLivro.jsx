import { useState, useEffect } from 'react';
import '../AdicionarEditar.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const AdicionarEditarLivro = ({ livroId, onLivroSaved }) => {
    const [livro, setLivro] = useState({
        titulo: '',
        isbn: '',
        autorId: '',
    });
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        // Carregar autores para o select
        axios.get('http://localhost:8080/autores')
            .then(response => {
                setAutores(response.data);
            })
            .catch(error => console.error("Erro ao buscar autores:", error));

        // Se for edição, carregar dados do livro
        if (livroId) {
            axios.get(`http://localhost:8080/livros/${livroId}`)
                .then(response => {
                    setLivro(response.data);
                })
                .catch(error => console.error("Erro ao buscar livro:", error));
        }
    }, [livroId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const endpoint = livroId ? `http://localhost:8080/livros/${livroId}` : 'http://localhost:8080/livros';
        const method = livroId ? 'put' : 'post';

        axios[method](endpoint, livro)
            .then(() => {
                onLivroSaved();
            })
            .catch(error => console.error("Erro ao salvar livro:", error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLivro(prevLivro => ({ ...prevLivro, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{livroId ? "Editar Livro" : "Adicionar Livro"}</h2>
            <label>
                Título:
                <input type="text" name="titulo" value={livro.titulo} onChange={handleChange} />
            </label>
            <br />
            <label>
                ISBN:
                <input type="text" name="isbn" value={livro.isbn} onChange={handleChange} />
            </label>
            <br />
            <label>
                Autor:
                <select name="autorId" value={livro.autorId} onChange={handleChange}>
                    <option value="">Selecione um autor</option>
                    {autores.map(autor => (
                        <option key={autor.id} value={autor.id}>{autor.nome}</option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Salvar Livro</button>
        </form>
    );
}

AdicionarEditarLivro.propTypes = {
    livroId: PropTypes.number,
    onLivroSaved: PropTypes.func.isRequired
};

export default AdicionarEditarLivro;
