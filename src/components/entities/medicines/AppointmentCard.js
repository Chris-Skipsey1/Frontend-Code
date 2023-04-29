import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './MedicineCard.css';

Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};
export default function AppointmentCard({ appointment, onClick, isParentHovering = false }) {
    // Card component holding values from the DB
    return (
        <Card className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>

            <div className="MedicineCard">
                <div className="centerIt">{`Your next appointment is ${appointment.DateAndTime} `}</div>
                <div><br></br></div>
                <center><div><h3>Appointment Details</h3></div></center>
                <div><b>{`Appointment ID:`}</b> {`${appointment.AppointmentID}`}</div>
                <div><b>{`Description:`}</b> {`${appointment.AppointmentDescription}`}</div>
                <div><b>{`Your name:`}</b> {`${appointment.ClientName}`} </div>
                <div><b>{`Personal Trainer's name:`}</b> {`${appointment.PersonalTrainerName}`} </div>
                <div><b>{`Appointment date:`}</b> {`${appointment.DateAndTime}`}    </div>
                <br></br>
                <br></br>
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

Card.Container = Container;