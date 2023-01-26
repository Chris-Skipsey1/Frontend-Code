//import { useState, useEffect } from 'react';
//import API from '../api/API.js';
import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import AppointmentCard from '../entities/medicines/AppointmentCard.js';


function ContactUs() {
  // Initialisation
  const loggedInUserID = 2;
  const endpoint = `/appointments/clients/${loggedInUserID}`;

  // useLoad


  // State-----

  const [appointments, , loadingMessage,] = useLoad(endpoint);

  //const handleSubmit = (appointment) => {}



  //View
  return (
    <section>
      <h2>My Appointments</h2>
      {
        !appointments
          ? <p>{loadingMessage}</p>
          : appointments.length === 0
            ? <p>No medicines found</p>
            : <Card.Container>
              {
                appointments.map((appointment) =>
                  <AppointmentCard key={appointment.AppointmentID} appointment={appointment} />
                )
              }
            </Card.Container>
      }
      
    </section>
  );
}
export default ContactUs;