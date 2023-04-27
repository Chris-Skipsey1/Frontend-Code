import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './NewMedicineCard.css';

Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};

export default function MedicineCard({ medicine, onClick, isParentHovering = false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    return (
        <Card  className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>
            
            <div className="TheCard">
            <div className="BoxStyle"><div><h1><img src={`${ medicine.MedicineURI}`} width="200" height="170"/></h1></div></div>
            <br></br>
            <h1>{`Medicine Details`} </h1>
           
            <div>{`Medicine Name: ${medicine.MedicineName}`}</div>
            <div>{`Medicine Description: ${medicine.MedicineDescription}`}</div>
            <div>{`Take at: ${ medicine.MedicineTakenDate}`}</div>
            {"Amount to take (mg):"}
            <br></br>
            <br></br>
            <div className="centerIt"><div><h1>{`${medicine.PrescriptionDosage} mg`}</h1></div></div>   
             

              
            </div>
        </Card>
    );
}
//<img className='' src=${exercise.Image}  

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