import { useState, useEffect } from 'react';

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
  const URL = 'http://localhost:5000/api';
  const endpointAddress = URL + endpoint;
  const response = await fetch(endpointAddress);
  const result = await response.json();
  setMedicines(result);
  }
useEffect(() => {apiCall(endpoint) }, [endpoint]);



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