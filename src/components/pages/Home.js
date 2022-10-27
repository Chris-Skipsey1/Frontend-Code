import { useState, useEffect } from 'react';
import API from '../api/API.js';
import Card from '../UI/Card.js';
import MedicineCard from '../entities/medicines/MedicineCard.js';


function Home() {
  // Initialisation
  const loggedInUserID = 5;
  const endpoint = `/medicines/clients/${loggedInUserID}`;

  //State
  const [medicines, setMedicines] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading medicines ...');

  //Context
  //Methods
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setMedicines(response.result)
      : setLoadingMessage(response.message)

  }
  useEffect(() => { apiCall(endpoint) }, [endpoint]);



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
export default Home;