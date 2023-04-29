import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './MedicineCard.css';

Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};

//<button onClick={toggleFavoritiesButton}>{itemIsFavorite ? 'Remove from Favourites' : 'Add to Favourites'}</button>

export default function ExerciseCard({ exercise, onClick, isParentHovering = false }) {

    return (
        <Card className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>

            <div className="MedicineCard">
                <div className="centerIt"><div><h1>{exercise.ExerciseName}</h1></div>{`Total times completed: ${exercise.AmountCompleted} `}</div>
                <div><br></br></div>
                <center><div><h3>Detailed Information</h3></div></center>
                <div><b>{`Exercise name:`}</b> {`${exercise.ExerciseName}`} </div>
                <div><b>{`Description:`}</b> {`${exercise.ExerciseDescription}`}    </div>
                <div><b>{`Last date completed:`}</b> {`${exercise.DateDone}`}</div>
                <div><b>{`Times completed:`}</b> {`${exercise.AmountCompleted}`} </div>


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