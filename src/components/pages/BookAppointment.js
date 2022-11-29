import AppointmentForm from '../entities/medicines/AppointmentForm.js';
import API from '../api/API.js';

function BookAppointment() {
  //Initilisation
  const appointmentsEndpoint = '/appointments';
  //State
  //Context
  //Handle
  const handleSubmit = async (appointment) => {
    const response = await API.post(appointmentsEndpoint, appointment);
  }
  //View
  return (
    <div>

      <AppointmentForm onSubmit={handleSubmit}/>
      
      
    </div>

  );
}

export default BookAppointment;