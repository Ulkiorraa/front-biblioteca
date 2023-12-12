import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/autores">Autores</Link></li>
                <li><Link to="/livros">Livros</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;