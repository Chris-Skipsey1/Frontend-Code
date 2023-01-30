import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import ExerciseCard from '../entities/medicines/ExerciseCard.js';


function MyExercises() {
  // Initialisation
  const loggedInUserID = 6;
  const endpoint = `/exercises/clients/${loggedInUserID}`;

  // useLoad


  // State-----

  const [exercises, , loadingMessage,] = useLoad(endpoint);

  //const handleSubmit = (appointment) => {}



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
                  <ExerciseCard key={exercises.ExerciseInfoID} exercise={exercise} />
                )
              }
            </Card.Container>
      }
      
    </section>
  );
}
export default MyExercises;