import { useState } from 'react';
import useLoad from '../../api/useLoad.js';
import Form from '../../UI/Form.js';

//Appointment placeholder----
const emptyAppointment = {
    AppointmentDescription: "",
    AppointmentAvailabilityID: 0,
    AppointmentClientID: 50
}
//----------------------------

export default function AppointmentForm({ onSubmit, initialAppointment = emptyAppointment }) {
    //const appointmentsEndpoint = '/appointments';
    console.log(JSON.stringify(initialAppointment));

    //Validate form by ID (required) and description length more than 1
    const isValid = {
        AppointmentClientID: (id) => id !== 0,
        AppointmentAvailabilityID: (id) => id !== 0,
        AppointmentDescription: (name) => name.length > 1
    }
    //-------------------------------------------------------------

    //Form error messages--------------------------------------------------------------------------
    const errorMessage = {
        AppointmentClientID: "You must select a client",
        AppointmentAvailabilityID: "You must select an availability slot",
        AppointmentDescription: "You need to write more than 2 letters to submit your appointment"
    }
    //---------------------------------------------------------------------------------------------
    
    // Conformance holds these two values so that they can be updated------------------------------
    const conformance = ['AppointmentClientID', 'AppointmentAvailabilityID'];
    //---------------------------------------------------------------------------------------------

    //Passes all values and states to the Form.useForm (Form.js file)-----------------------------
    const [appointment, setAppointment, errors, handleChange2, handleSubmit] = Form.useForm(initialAppointment, conformance, { isValid, errorMessage }, onSubmit);
    //--------------------------------------------------------------------------------------------

    //useState set to 0, means initial value in the dropdown selection is a message and not a trainer name
    const [personalTrainerID, setPersonalTrainerID] = useState(0);
    //----------------------------------------------------------------------------------------------------

    //useLoad State-------------------
    //It gets the personal trainers and the trainer's availability and loads them
    //personalTrainers and trainerAvailability is the mapped key, and useLoad gets the entire /personal trainers and availability/personaltrainers/id endpoint
    const [personalTrainers, , loadingTrainersMessage,] = useLoad('/personaltrainers'); //Populates personal trainer dropdown
    
    const [id, loadTrainerAvailability] = useState(0);
    const [trainerAvailability, , loadingAvailabilityMessage,] = useLoad(`/availability/personaltrainers/${id}`); //Populates availability dropdown based on personal trainer selected

    //Handle Change --------------------------------------------------------------------
    const handleChange1 = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'PersonalTrainerID') ? parseInt(value) : value;
        setAppointment(initialAppointment);
        setPersonalTrainerID(newValue);
        loadTrainerAvailability(newValue);
    };
    //----------------------------------------------------------------------------------

    //Pop alert telling it has been submitted. Runs when button clicked.
    function popup() {
        alert("Your appointment has been successfully submitted! Go to the My Booked Appointments page to view, edit or cancel this appointment.");
    }
    //-----------------------------------------------------------------------------------

    // View of form
    return (
        <div className="FormBox">
            <center>
                <Form>
                    <Form.Item // #1 Personal Trainer dropdown
                        htmlFor="PersonalTrainerID"
                        advice="Step 1: Choose a personal trainer name" // Top advice
                        error={errors.PersonalTrainerID}
                    >
                        {
                            !personalTrainers
                                ? <p>{loadingTrainersMessage}</p>
                                : personalTrainers.length === 0
                                    ? <p>No trainers found</p>
                                    : <select style={{ width: 500 }}
                                        name="PersonalTrainerID"
                                        value={personalTrainerID}
                                        onChange={handleChange1}
                                    >
                                        <option style={{ color: "red" }} value="0" disabled>Click this dropdown to select a Personal Trainer...</option>
                                        {
                                            personalTrainers.map((trainer) => <option key={trainer.PersonalTrainerID} value={trainer.PersonalTrainerID}>{trainer.PersonalTrainerName}</option>)
                                        }
                                    </select>
                        }
                    </Form.Item>

                    <Form.Item // #2 Availability Personal Trainer dropdown
                        htmlFor="AvailabilityPersonalTrainerID"
                        advice="Step 2: Choose the personal trainer's availability" // Top advice
                        error={errors.AvailabilityPersonalTrainerID}
                    >
                        {
                            !personalTrainerID
                                ? <p>To see a date, first you must select a Personal Trainer in Step 1.</p>
                                : !trainerAvailability
                                    ? <p>{loadingAvailabilityMessage}</p>
                                    : trainerAvailability.length === 0
                                        ? <p>No availability found</p>
                                        : <select style={{ width: 700 }}
                                            name="AppointmentAvailabilityID"
                                            value={appointment.AppointmentAvailabilityID}
                                            onChange={handleChange2}
                                        >
                                            <option value="0" disabled>Click this dropdown to select the Personal Trainer's available date...</option>
                                            {
                                                trainerAvailability.map((availabilitys) => <option key={availabilitys.AvailabilityID} value={availabilitys.AvailabilityID}>{availabilitys.DateAndTime}</option>) // ({availabilitys.AvailabilityID})
                                            }
                                        </select>
                        }
                    </Form.Item>

                    <Form.Item // #3 Description box
                        htmlFor="AppointmentDescription"
                        advice="Step 3: Write a message and let your Personal Trainer know what exercises you would like to do" // Top advice
                        error={errors.AppointmentDescription}
                    >
                        <textarea placeholder="Write your messge here..."
                            cols="100"
                            rows="8"
                            type="text"
                            name="AppointmentDescription"
                            value={appointment.AppointmentDescription}
                            onChange={handleChange2}
                        />
                    </Form.Item>

                    <center><button disabled={appointment.AppointmentDescription.length >= 2 ? false : true} onClick={() => [handleSubmit(), popup()]} className="buttonStuff">Book Appointment</button></center>
                </Form>
            </center>
        </div>

    );
}