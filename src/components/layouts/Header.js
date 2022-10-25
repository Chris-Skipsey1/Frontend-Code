import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header>
            <Link to="/">
                <img src="" alt="person" />
            </Link>
            <Link to="/">
                <h1>Improve Health</h1>
            </Link>
            <div className="login">
                <p>Welcome to the platform</p>
            </div>
        </header>
    )
}
export default Header;