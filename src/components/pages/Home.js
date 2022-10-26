import { useState, useEffect } from 'react';
import API from '../api/API.js';

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
      <h2>Home page</h2>
      {
        !medicines
          ? <p>{loadingMessage}</p>
          : medicines.length === 0
            ? <p>No medicines found</p>
            : medicines.map((medicine) =>
                  <p key={medicine.MedicineID}>{medicine.MedicineID} {medicine.MedicineName}</p>
                )

      }
    </section>

  );
}

export default Home;