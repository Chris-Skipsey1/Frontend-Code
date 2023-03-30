import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import ExerciseCard from '../entities/medicines/ExerciseCard.js';
import { useContext, useState } from "react";
import API from '../api/API.js';

const exerciseObject = {
  AmountCompleted: 5,
  DateDone: "26/12/2023",
  ExerciseDescription: "Walk around every corner of your home.",
  ExerciseInfoID: 1006,
  ExerciseName: "Lap around the house",
  Favourite: 0,
  InfoClientID: 6,
  InfoExerciseID: 1003
}


function MyExercises() {
  // Initialisation
  const loggedInUserID = 6;
  const endpoint = `/exercises/clients/${loggedInUserID}`;
  const exercisesEndpoint = '/exercises';
  const [exercises, , loadingMessage,] = useLoad(endpoint);

  

  //const [clientFavourites, setClientFavorites] = useState([]);
  
  const [isFavourite, isSetFavourite] = useState();

 
  const handleFavourite = async (exercise) => {
    //exerciseObject.Favourite = isFavourite;
    const response = await API.put(`${exercisesEndpoint}/${exercise.ExerciseInfoID}`, exercise);
    exercise.Favourite = exercise.Favourite ? 0 : 1;



    console.log(exercise)
    //const endpoint1 = `${exercisesEndpoint}/${exercise.ExerciseInfoID}`
    //console.log(endpoint1)
    //console.log(JSON.stringify(exercise))
    isSetFavourite(!isFavourite);
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
                
                exercises.map((exercise) => {
                if (exercise.Favourite = 1)
                {
                  <Card key={exercise.ExerciseInfoID}>
                    <ExerciseCard exercise={exercise} /> 
                  <button className="secondButtonStuff" onClick={() => handleFavourite(exercise)}>
                    {isFavourite ? 'Remove favourite' : 'Favourite this exercise'}</button>
                    
                  </Card>
                } else {
                  <p>hi</p>
                }
              }
              )
              }
              
              
            </Card.Container>
      }
    
    </section>
  );
}
export default MyExercises;