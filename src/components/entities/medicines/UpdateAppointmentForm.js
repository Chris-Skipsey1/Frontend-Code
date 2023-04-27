import { useState } from 'react';
//import API from '../../api/API.js';
import useLoad from '../../api/useLoad.js';
import Form from '../../UI/Form.js';
import API from '../../api/API.js';


const emptyAppointment = {
    AppointmentDescription: "",
    AppointmentAvailabilityID: 0,
    AppointmentClientID: 50
}

//Dont undo from here
export default function AppointmentForm({ onSubmit, initialAppointment = emptyAppointment }) {
    //const appointmentsEndpoint = '/appointments';
    console.log(JSON.stringify(initialAppointment));
    // Initialisation ---
    const [personalTrainerID, setPersonalTrainerID] = useState(initialAppointment.AvailabilityPersonalTrainerID);
    const AvailabilityID = initialAppointment.AvailabilityID;
    console.log(initialAppointment);


    const isValid = {
        AppointmentClientID: (id) => id !== 0,
        AppointmentAvailabilityID: (id) => id !== 0,
        AppointmentDescription: (name) => name.length > 1
    }
    const errorMessage = {
        AppointmentClientID: "You must select a client",
        AppointmentAvailabilityID: "You must select an availability slot",
        AppointmentDescription: "You need to write more than 2 letters to submit your appointment"
    }

      const conformance = ['AppointmentClientID', 'AppointmentAvailabilityID'];

    // GET Personal Trainers
    // State ---
    const [appointment, setAppointment, errors, handleChange2, handleSubmit] = Form.useForm(initialAppointment, conformance, {isValid, errorMessage}, onSubmit);
    //const [personalTrainerID, setPersonalTrainerID] = useState(0);
    
    // useLoad
    // Refactored - working ---
    const [personalTrainers, , loadingTrainersMessage,] = useLoad('/personaltrainers');
    // --- Refactored - working

    // Refactoring - Not working ---
    const [id, loadTrainerAvailability] = useState(AvailabilityID); //state.appointment.AppointmentAvailabilityID
    const [trainerAvailability, , loadingAvailabilityMessage,] = useLoad(`/availability/personaltrainers/${id}`);
    console.log(errors.AvailabilityPersonalTrainerID);
    
    // --- Refactoring - Not working
    const appointmentsEndpoint = '/appointments';
    const handleSubmit1 = async (appointment) => {
       // handleSubmit();
        const response = await API.put(`${appointmentsEndpoint}/${appointment.AppointmentID}`, appointment);
        if ( response.isSuccess ) {
          <p>Completed.</p>
        }
      }

    const handlePreSubmit = () => {
        handleSubmit();
    }
   

      // Conformance

    // Handlers ---
   


    //old
    const handleChange1 = (event) => {
        const { name, value } = event.target;
        console.log(name + ` ` + value);
        const newValue = (name === 'PersonalTrainerID') ? parseInt(value) : value;
        switch (name) {
            case 'PersonalTrainerID':
                setPersonalTrainerID(newValue);
                // call endpoint 
                //loadTrainerAvailability();
                break;
            default:
                loadTrainerAvailability(newValue); 
        }
        
        //setAppointment(initialAppointment);
        console.log(event.target.value);
        console.log(initialAppointment);
        //setPersonalTrainerID(newValue);
        //loadTrainerAvailability(newValue); 
        
    };

   //Old
    //const handleChange2 = (event) => {
        //const { name, value } = event.target;
        //const newValue = (name === 'AvailabilityPersonalTrainerID') ? parseInt(value) : value;
        //setAppointment({ ...appointment, [name]: newValue });
        //setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
    //};

    function popup() {
        alert("Your appointment has been successfully updated.");
    }
  



    // View ---
    return (
        <Form>

            <Form.Item
                //label="Personal Trainer Name" // Top label
                htmlFor="PersonalTrainerID"
                advice="Choose a personal trainer name" // Top advice
                error={errors.PersonalTrainerID}
            >
                {
                    !personalTrainers
                        ? <p>{loadingTrainersMessage}</p>
                        : personalTrainers.length === 0
                            ? <p>No trainers found</p>
                            : <select
                                name="PersonalTrainerID"
                                value={personalTrainerID}
                                onChange={handleChange1}
                            >

                                <option value="0" disabled>Select personal trainer</option>

                                {
                                    personalTrainers.map((trainer) => <option key={trainer.PersonalTrainerID} value={trainer.PersonalTrainerID}>{trainer.PersonalTrainerName}</option>)
                                }

                            </select>
                }
            </Form.Item>


            <Form.Item
                //label="Personal Trainer Availability" // Top label
                htmlFor="AvailabilityPersonalTrainerID"
                advice="Choose the personal trainer's availability" // Top advice
                error={errors.AvailabilityPersonalTrainerID}
            >

                {

                    !personalTrainerID
                        ? <p>To see a date, first you must select a personal trainer from above.</p>
                        : !trainerAvailability
                            ? <p>{loadingAvailabilityMessage}</p>
                            : trainerAvailability.length === 0
                                ? <p>No availability found</p>
                                : <select
                                    name="AppointmentAvailabilityID"
                                    value={appointment.AppointmentAvailabilityID}
                                    onChange={handleChange2}
                                >

                                    <option value="0" disabled>Select the personal trainer's available date from this dropdown</option>

                                    {
                                        trainerAvailability.map((availabilitys) => <option key={availabilitys.AvailabilityID} value={availabilitys.AvailabilityID}>{availabilitys.DateAndTime}</option>) // ({availabilitys.AvailabilityID})
                                    }

                                </select>
                }
            </Form.Item>

            <Form.Item
                //label="Enter a Description"
                htmlFor="AppointmentDescription"
                advice="Write something to your trainer. This could be any details you would like to let the trainer know*" // Top advice
                error={errors.AppointmentDescription}
            >
                <textarea
                cols = "100"
                rows = "8"
                    type="text"
                    name="AppointmentDescription"
                    value={appointment.AppointmentDescription}
                    onChange={handleChange2}
                />
               

            </Form.Item>
            
            <button disabled={appointment.AppointmentDescription.length >= 2 ? false:  true } onClick={() => [handlePreSubmit(), popup()]} className="buttonStuff">Update Appointment</button>
            
        </Form>
        //<p>{appointment.AppointmentDescription.length < 2 ? "" : ""}</p>
    );
}