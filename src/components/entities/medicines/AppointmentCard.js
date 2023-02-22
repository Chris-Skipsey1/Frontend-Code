import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './MedicineCard.css';



Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};

export default function AppointmentCard({ appointment, onClick, isParentHovering = false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    return (
        <Card  className={"Card" + (isParentHovering ? " Hovering" : "") } onClick={onClick}>
             
            <div className="MedicineCard">
                <div className="centerIt">{`Your next appointment is ${appointment.DateAndTime} `}</div>
                <div><br></br></div>
                <div>{`Appointment ID: ${appointment.AppointmentID}`}</div>
                <div>{`Description: ${appointment.AppointmentDescription}`}</div> 
                <div>{`Your name: ${appointment.ClientName}`} </div>
                <div>{`Personal Trainer's name: ${appointment.PersonalTrainerName}`} </div>
                <div>{`Appointment date: ${appointment.DateAndTime}`}    </div>
                <br></br>
                
            </div>
            
        </Card>
    );
}

Container.propTypes = {
    className: PropTypes.string
};

function Container({ children, className = "" }) {
    return (
        <div className={"CardContainer " + className}>
            {children}
        </div>
    );
}

// -----------------------------------------
// Compose Card Object /////////////////////
// -----------------------------------------

Card.Container = Container;