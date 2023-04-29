import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './NewMedicineCard.css';

Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};

export default function MedicineCard({ medicine, onClick, isParentHovering = false }) {

    return (
        <Card className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>

            <div className="TheCard">
                <div className="BoxStyle"><div><h1><img src={`${medicine.MedicineURI}`} alt="A medicine" width="200" height="170" /></h1></div></div>
                <br></br>
                <center><h3>{`Medicine Details`} </h3></center>

                <div><b>{`Medicine Name:`}</b> {`${medicine.MedicineName}`}</div>
                <div><b>{`Medicine Description:`}</b> {`${medicine.MedicineDescription}`}</div>
                <b>{`Amount to take (mg):`}</b> {`${medicine.PrescriptionDosage}`}
                <br></br>
                <br></br>
                <div className="centerIt"><div><p>{medicine.MedicineTakenDate}</p></div></div>



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

Card.Container = Container;