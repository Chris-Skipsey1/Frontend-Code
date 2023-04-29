import UpdateAppointmentForm from '../entities/medicines/UpdateAppointmentForm.js';
import API from '../api/API.js';
import { useLocation } from "react-router-dom";


function UpdateAppointment() {
  //Initilisation
  const appointmentsEndpoint = '/appointments';
  const location = useLocation();
  const appointment = location.state.appointment;
  console.log("yes2");
  //State
  //Context
  //Handle
  const handleSubmit = async (appointment) => {
    console.log(appointment);
    const response = await API.put(`${appointmentsEndpoint}/${appointment.AppointmentID}`, appointment);
    if (response.isSuccess) {
      <p>Completed.</p>
    }
  }
  console.log("yes3");
  //console.log(state);


  //View
  return (
    <div>
      <h2>Update your Appointment</h2>
      <p>Fill out the details to make update your appointment.</p>
      <br></br>
      <UpdateAppointmentForm onSubmit={handleSubmit} initialAppointment={appointment} />
    </div>

  );
}

export default UpdateAppointment;