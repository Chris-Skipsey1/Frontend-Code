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
  const loggedInUserID = 1;
  const endpoint = `/exercises/clients/${loggedInUserID}`;
  const exercisesEndpoint = '/exercises';
  const [exercises, , loadingMessage,] = useLoad(endpoint);



  //const [clientFavourites, setClientFavorites] = useState([]);

  const [isFavourite, isSetFavourite] = useState();
  const handleFavourite = async (exercise) => {
    //exerciseObject.Favourite = isFavourite;
    exercise.Favourite = exercise.Favourite ? 0 : 1;
    const response = await API.put(`${exercisesEndpoint}/${exercise.ExerciseInfoID}`, exercise);
    isSetFavourite(!isFavourite);
  }


  //View
  return (
    <section>
      <h2>My completed Exercises</h2>
      <p>Exercises that you have marked as complete. If the page is blank, then you have no completed exercises for today. </p>


      {
        !exercises
          ? <p>{loadingMessage}</p>
          : exercises.length === 0
            ? <p>No exercises found</p>
            : <Card.Container>
              {
                exercises.map((exercise) => exercise.Favourite
                  ? <Card key={exercise.ExerciseInfoID}>
                    <ExerciseCard exercise={exercise} />
                    <center><button className="secondButtonStuff" style={{ background: exercise.Favourite ? "red" : "green" }} onClick={() => handleFavourite(exercise)}>
                      {exercise.Favourite ? 'Mark as uncompleted' : 'Mark exercise as completed today'}</button></center>
                  </Card>
                  : <p></p>
                )

              }
            </Card.Container>

      }

    </section>

  );
}

export default MyExercises;