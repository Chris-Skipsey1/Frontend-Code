import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './MedicineCard.css';

Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};

export default function ClientCard({ client, onClick, isParentHovering = false }) {

    return (
        <Card className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>

            <div className="MedicineCard">
                <div className="centerIt"><div><h1>{`Client ID: ${client.ClientID} `}</h1></div></div>
                <div><br></br></div>
                <div className="centerIt"><div><h1>{`Client: ${client.ClientName} `}</h1></div></div>
                <div><br></br></div>
                <div><br></br></div>
                <div>This client wants to book an appointment with you.</div>
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