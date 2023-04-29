import { useState } from 'react';
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
    const [appointment, setAppointment, errors, handleChange2, handleSubmit] = Form.useForm(initialAppointment, conformance, { isValid, errorMessage }, onSubmit);
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
        if (response.isSuccess) {
            <p>Completed.</p>
        }
    }

    const handlePreSubmit = () => {
        handleSubmit();
    }

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

    function popup() {
        alert("Your appointment has been successfully updated.");
    }

    // View ---
    return (
        <div className="FormBox">
            <center>
                <Form>
                    <Form.Item // #1 Personal Trainer dropdown
                        //label="Personal Trainer Name" // Top label
                        htmlFor="PersonalTrainerID"
                        advice="Your Personal Trainer" // Top advice
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
                                        <option value="0" disabled>Select personal trainer</option>

                                        {
                                            personalTrainers.map((trainer) => <option key={trainer.PersonalTrainerID} value={trainer.PersonalTrainerID}>{trainer.PersonalTrainerName}</option>)
                                        }
                                    </select>
                        }
                    </Form.Item>

                    <Form.Item // #2 Availability personal Trainer dropdown
                        //label="Personal Trainer Availability" // Top label
                        htmlFor="AvailabilityPersonalTrainerID"
                        advice="Step 1: Choose a new Personal Trainer availability" // Top advice
                        error={errors.AvailabilityPersonalTrainerID}
                    >
                        {
                            !personalTrainerID
                                ? <p>To see a date, first you must select a personal trainer from above.</p>
                                : !trainerAvailability
                                    ? <p>{loadingAvailabilityMessage}</p>
                                    : trainerAvailability.length === 0
                                        ? <p>No availability found</p>
                                        : <select style={{ width: 700 }}
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

                    <Form.Item // #3 Description box
                        //label="Enter a Description"
                        htmlFor="AppointmentDescription"
                        advice="Step 2: Update your message to your Personal Trainer" // Top advice
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

                    <button disabled={appointment.AppointmentDescription.length >= 2 ? false : true} onClick={() => [handlePreSubmit(), popup()]} className="buttonStuff">Update Appointment</button>
                </Form>
            </center>
        </div>
        //<p>{appointment.AppointmentDescription.length < 2 ? "" : ""}</p>
    );
}