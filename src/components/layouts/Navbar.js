import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const getLinkStyle = ({ isActive }) => (isActive ? 'navSelected' : null);

    return (
        <nav>
            <div className="navItem">
                <NavLink to='/info' className={getLinkStyle}>Helpful Information</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/mymedicines' className={getLinkStyle}>My Medicines</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/bookappointment' className={getLinkStyle}>Book an Appointment</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/listappointments' className={getLinkStyle}>My Booked Appointments</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/myexercises' className={getLinkStyle}>My Exercises</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/favoriteexercises' className={getLinkStyle}>Completed Exercises</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/favoritemedicines' className={getLinkStyle}>Medicines taken today</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/clients' className={getLinkStyle}>My Clients</NavLink>
            </div>
        </nav>
    )
}
export default Navbar;