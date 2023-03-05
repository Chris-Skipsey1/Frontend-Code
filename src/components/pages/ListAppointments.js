//import { useState } from 'react';
//import API from '../api/API.js';
import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import AppointmentCard from '../entities/medicines/AppointmentCard.js';
import { useNavigate, useLocation } from "react-router-dom";
import API from '../api/API.js';
//import Modal from '../UI/Modal.js';


function ListAppointments() {
  // Initialisation
  const loggedInUserID = 50;
  const endpoint = `/appointments/clients/${loggedInUserID}`;
  const deleteAppointmentsEndpoint = 'appointments';
  const navigate = useNavigate();
  const { state} = useLocation();
  //const [openModal, setOpenModal] = useState(false);
  

  // useLoad


  // State-----

  const [appointments, setAppointments , loadingMessage,] = useLoad(endpoint);

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
    let appointmentsCopy = [...appointments];
    const response = await API.delete(`/${deleteAppointmentsEndpoint}/${id}`);
    if ( response.isSuccess ) {
    }
    for ( let i=0; i<appointmentsCopy.length; i++ ) {
      if (appointmentsCopy[i].AppointmentID === id ) {
        let appointmentsCopy1 = appointmentsCopy.splice(0,i);
        let appointmentsCopy2 = appointmentsCopy.splice(i+1, appointmentsCopy.length);
        appointmentsCopy = appointmentsCopy1.concat(appointmentsCopy2);
        //appointmentsCopy.drop(i);
      }
    }
    setAppointments(appointmentsCopy);
  }

  function popup() {
    alert("Your appointment has been cancelled.");
}



 //<button className="secondButtonStuff" onClick={() => appointmentDelete(appointment.AppointmentID)}>Cancel Appointment</button>
 //<button className="secondButtonStuff" onClick={() => {setOpenModal(true)}}>Cancel Appointment</button>
//<div>{openModal && <Modal closeModal={setOpenModal}/>}</div>

  //View
  return (
    <section>
      <h2>My Appointments</h2>
      <p>Hi there {loggedInUserID}</p>
      {
        !appointments
          ? <p>{loadingMessage}</p>
          : appointments.length === 0
            ? <p>No medicines found</p>
            : <Card.Container>
              
                
              {
                
                appointments.map((appointment) =>
                  <Card key={appointment.AppointmentID}><AppointmentCard appointment={appointment} />
                  <button className="secondButtonStuff" onClick={() => appointmentUpdate(appointment)}>Edit Appointment</button>
                  <button className="secondButtonStuff" onClick={() => [appointmentDelete(appointment.AppointmentID), popup()]}>Cancel Appointment</button>
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