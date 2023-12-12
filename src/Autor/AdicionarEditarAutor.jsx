import { useState, useEffect } from 'react';
import '../AdicionarEditar.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const AdicionarEditarAutor = ({ autorId, onAutorSaved }) => {
    const [autor, setAutor] = useState({
        nome: ''
    });

    useEffect(() => {
        if (autorId) {
            axios.get(`http://localhost:8080/autores/${autorId}`)
                .then(response => {
                    setAutor(response.data);
                })
                .catch(error => console.error("Erro ao buscar autor:", error));
        }
    }, [autorId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const endpoint = autorId ? `http://localhost:8080/autores/${autorId}` : 'http://localhost:8080/autores';
        const method = autorId ? 'put' : 'post';

        axios[method](endpoint, autor)
            .then(() => {
                onAutorSaved();
            })
            .catch(error => console.error("Erro ao salvar autor:", error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAutor(prevAutor => ({ ...prevAutor, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{autorId ? "Editar Autor" : "Adicionar Autor"}</h2>
            <label>
                Nome:
                <input type="text" name="nome" value={autor.nome} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Salvar Autor</button>
        </form>
    );
}

AdicionarEditarAutor.propTypes = {
    autorId: PropTypes.number,
    onAutorSaved: PropTypes.func.isRequired
};

export default AdicionarEditarAutor;
