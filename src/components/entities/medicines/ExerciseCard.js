import { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from '../../UI/Card.js';
import './MedicineCard.css';
import MyExercises from '../../pages/MyExercises.js';



Card.propTypes = {
    onClick: PropTypes.func,
    isParentHovering: PropTypes.bool
};

//<button onClick={toggleFavoritiesButton}>{itemIsFavorite ? 'Remove from Favourites' : 'Add to Favourites'}</button>

export default function ExerciseCard({ exercise, onClick, isParentHovering = false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------


    
    return (
        <Card  className={"Card" + (isParentHovering ? " Hovering" : "") } onClick={onClick}>
             
            <div className="MedicineCard">
                <div className="centerIt"><div><h1>{exercise.ExerciseName}</h1></div>{`Total times completed: ${exercise.AmountCompleted} `}</div>
                <div><br></br></div>
                <div><h3>Detailed Information</h3></div>
                <div>{`Exercise name: ${exercise.ExerciseName}`} </div>
                <div>{`Description: ${exercise.ExerciseDescription}`}    </div>
                <div>{`Last date completed: ${exercise.DateDone}`}</div> 
                <div>{`Times completed: ${exercise.AmountCompleted}`} </div>
                
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