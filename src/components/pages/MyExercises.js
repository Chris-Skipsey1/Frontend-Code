import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import ExerciseCard from '../entities/medicines/ExerciseCard.js';
import { createContext, useState } from "react";
import API from '../api/API.js';

const exerciseObject = {
  ExerciseInfoID: 1006,
  DateDone: "24/12/2023",
  AmountCompleted: 5,
  InfoExerciseID: 1003,
  InfoClientID: 6,
  Favourite: 0,
  ExerciseName: "Lap around the house",
  ExerciseDescription: "Walk around every corner of your home."
}


function MyExercises({ inititalExercise =  exerciseObject }) {

  // Initialisation
  const loggedInUserID = 6;
  const endpoint = `/exercises/clients/${loggedInUserID}`;
  const exercisesEndpoint = '/exercises';
  const [exercises, , loadingMessage,] = useLoad(endpoint);

  const [isFavourite, isSetFavourite] = useState(false);
  const handleFavourite = async (exercise) => {
    const response = await API.put(`${exercisesEndpoint}/${exercise.ExerciseInfoID}`, exercise);
    isSetFavourite(!isFavourite);
    console.log(exercise.ExerciseInfoID)
  }

  //View
  return (
    <section>
      <h2>My Exercises</h2>
      <p>On this page you will find the exercises that you have completed.</p>

      <div><br></br></div>
      {
        !exercises
          ? <p>{loadingMessage}</p>
          : exercises.length === 0
            ? <p>No exercises found</p>
            : <Card.Container>
              {
                
                exercises.map((exercise) =>
                  <Card key={exercise.ExerciseInfoID}>
                    <ExerciseCard exercise={exercise} /> 
                  <button className="secondButtonStuff" onClick={() => handleFavourite(exercise.ExerciseInfoID)}>
                    {isFavourite ? 'Remove favourite' : 'Favourite this exercise'}</button>
                  </Card>
                  )
              }
            </Card.Container>
      }
    
    </section>
  );
}
export default MyExercises;