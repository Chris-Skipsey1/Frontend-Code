//import { useState, useEffect } from 'react';
//import API from '../api/API.js';
import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import AppointmentCard from '../entities/medicines/AppointmentCard.js';
import { useNavigate, useLocation } from "react-router-dom";
import API from '../api/API.js';



function ListAppointments() {
  // Initialisation
  const loggedInUserID = 2;
  const endpoint = `/appointments/clients/${loggedInUserID}`;
  const deleteAppointmentsEndpoint = 'appointments';
  const navigate = useNavigate();
  const { state} = useLocation();
  // useLoad


  // State-----

  const [appointments, , loadingMessage,] = useLoad(endpoint);

  //const handleSubmit = (appointment) => {}

  const appointmentUpdate = (appointment) => {
    navigate(
      '/updateappointment',
      {
        state: { appointment: appointment }
      }
    );
  }

  const appointmentDelete = async (id) => {
    const response = await API.delete(`${deleteAppointmentsEndpoint}/${id}`);
    if ( response.isSuccess ) {
      <p>Completed.</p>
    }
  }
 

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
                  <Card><AppointmentCard key={appointment.AppointmentID} appointment={appointment} />
                  <button className="secondButtonStuff" onClick={() => appointmentUpdate(appointment)}>Edit Appointment</button>
                  <button className="secondButtonStuff" onClick={() => appointmentDelete(appointment.AppointmentID)}>Cancel Appointment</button>
                  </Card>
                  
                   //On click 
                )
              }
            </Card.Container>
      }
      
    </section>
  );
}
export default ListAppointments;