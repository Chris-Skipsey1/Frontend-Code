import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header>
            <Link to="/info">
                <img src="https://i.imgur.com/jzDNGUL.png" alt="Image of a medical logo." width="70" height="70" />
            </Link>
            <Link to="/info">
                <h1>Medicine, Exercise and Appointment Tracker</h1>
            </Link >
            <div className="login">
                <p>Welcome to the platform</p>
            </div>
        </header>
    )
}
export default Header;