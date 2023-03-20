import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header>
            <Link to="/mymedicines">
                <img src="https://img.icons8.com/pastel-glyph/60/hospital--v1.png" alt="person" />
            </Link>
            <Link to="/mymedicines">
                <h1>Improve your Health!</h1>
            </Link>
            <div className="login">
                <p>Welcome Chris to the platform</p>
            </div>
        </header>
    )
}
export default Header;