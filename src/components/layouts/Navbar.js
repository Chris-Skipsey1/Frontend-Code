import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const getLinkStyle = ({ isActive }) => ( isActive ? 'navSelected' : null);
    
    return (
        <nav>
            <div className="navItem">
                <NavLink to='/' className={getLinkStyle}>My Medicines</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/bookappointment' className={getLinkStyle}>Book an Appointment</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/listappointments' className={getLinkStyle}>List Appointments</NavLink>
            </div>
            <div className="navItem">
                 <NavLink to='/myexercises' className={getLinkStyle}>My Exercises</NavLink>
            </div>



        </nav>
    )
}
export default Navbar;