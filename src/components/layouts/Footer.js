import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <a href="https://icons8.com/icon/85327/expand-arrow">
                Credit to Icons8
            </a>
            <a>

                © Chris Skipsey FYP Application 2023
            </a>
            <Link to="/info">
                <a className="yes">Click here</a>
            </Link>
        </footer>

    )
}

export default Footer;