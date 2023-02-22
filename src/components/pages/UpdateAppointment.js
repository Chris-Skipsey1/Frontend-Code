import UpdateAppointmentForm from '../entities/medicines/UpdateAppointmentForm.js';
import API from '../api/API.js';
import { useLocation } from "react-router-dom";

function UpdateAppointment() {
  //Initilisation
  const appointmentsEndpoint = '/appointments';
  const location = useLocation();
  const appointment = location.state.appointment;
  //State
  //Context
  //Handle
  const handleSubmit = async (appointment) => {
    const response = await API.put(`${appointmentsEndpoint}/${appointment.AppointmentID}`, appointment);
    if ( response.isSuccess ) {
      <p>Completed.</p>
    }
  }

  
  //View
  return (
    <div>

      <UpdateAppointmentForm onSubmit={handleSubmit} initialAppointment={appointment}/>
      
      
    </div>

  );
}

export default UpdateAppointment;