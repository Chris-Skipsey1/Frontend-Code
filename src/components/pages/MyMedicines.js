//import { useState, useEffect } from 'react';
//import API from '../api/API.js';
import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import MedicineCard from '../entities/medicines/MedicineCard.js';


function MyMedicines() {
  // Initialisation
  const loggedInUserID = 5;
  const endpoint = `/medicines/clients/${loggedInUserID}`;

  // useLoad


  // State-----

  const [medicines, , loadingMessage,] = useLoad(endpoint);

  //const handleSubmit = (appointment) => {}



  //View
  return (
    <section>
      <h2>My Medicines</h2>
      {
        !medicines
          ? <p>{loadingMessage}</p>
          : medicines.length === 0
            ? <p>No medicines found</p>
            : <Card.Container>
              {
                medicines.map((medicine) =>
                  <MedicineCard key={medicine.MedicineID} medicine={medicine} />
                )
              }
            </Card.Container>
      }
      
    </section>
  );
}
export default MyMedicines;