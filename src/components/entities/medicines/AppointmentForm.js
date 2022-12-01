import { useState, useEffect } from 'react';
import API from '../../api/API.js';
import FormItem from '../../UI/Form.js';

const emptyAppointment = {
    //PersonalTrainerID: 0,
    //PersonalTrainerName: 1,
    AppointmentDescription: "",
    AppointmentAvailabilityID: 0,
    AppointmentClientID: 9
    //AvailabilitySlotStateID: 0,
    //AvailabilityPersonalTrainerID: 0,
    //AvailabilityID: 0
}


export default function AppointmentForm({ onSubmit, initialAppointment = emptyAppointment }) {

    // Initialisation ---
    const appointmentsEndpoint = '/appointments';

    const isValid = {
        AppointmentClientID: (id) => id !== 0,
        AppointmentAvailabilityID: (id) => id !== 0,
        AppointmentDescription: (name) => name.length > 1
    }

    const errorMessage = {
        AppointmentDescription: "You need to write more than 2 letters to submit your appointment",
        PersonalTrainerID: "You must select a personal trainer",
        AvailabilityPersonalTrainerID: "You must select a personal trainer availability"
    }

    // State ---
    const [appointment, setAppointment] = useState(initialAppointment);
    const [personalTrainerID, setPersonalTrainerID] = useState(0);

    const [personalTrainers, setPersonalTrainers] = useState(null);
    const [loadingTrainersMessage, setLoadingTrainersMessage] = useState('Loading trainers ...');

    const [errors, setErrors] = useState(
        Object.keys(initialAppointment).reduce(
            (accum, key) => ({ ...accum, [key]: null }), {})
    );




    // GET Personal Trainers
    const getPersonalTrainers = async () => {
        const response = await API.get('/personaltrainers');
        response.isSuccess
            ? setPersonalTrainers(response.result)
            : setLoadingTrainersMessage(response.message)

    }
    useEffect(() => { getPersonalTrainers() }, []);


    const [trainerAvailability, setTrainerAvailability] = useState(null);
    const [loadingAvailabilityMessage, setLoadingAvailabilityMessage] = useState('Loading availability ...');

    // GET Personal Trainers
    const getTrainerAvailability = async (id) => {
        const response = await API.get(`/availability/personaltrainers/${id}`);
        response.isSuccess
            ? setTrainerAvailability(response.result)
            : setLoadingAvailabilityMessage(response.message)

    }
    useEffect(() => { getTrainerAvailability(0) }, []);

    // Handlers ---
    const handleChange1 = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'PersonalTrainerID') ? parseInt(value) : value;
        setAppointment(initialAppointment);
        setPersonalTrainerID(newValue);
        getTrainerAvailability(newValue);
    };

    const handleChange2 = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'AvailabilityPersonalTrainerID') ? parseInt(value) : value;
        setAppointment({ ...appointment, [name]: newValue });
        setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
    };

    const isValidAppointment = (appointment) => {
        let isAppointmentValid = true;
        Object.keys(appointment).forEach((key) => {
            if (isValid[key](appointment[key])) {
                errors[key] = null;
            } else {
                errors[key] = errorMessage[key];
                isAppointmentValid = false;
            }
        });
        return isAppointmentValid;
    }

    const handleSubmit = () => {
        onSubmit(appointment);
        isValidAppointment(appointment);
        setErrors({...errors});
    }



    // View ---
    return (
        <form className="BorderedForm">

            <FormItem
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
            </FormItem>


            <FormItem
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
            </FormItem>

            <FormItem
                //label="Enter a Description"
                htmlFor="AppointmentDescription"
                advice="Write something to your trainer. This could be any details you would like to let the trainer know*" // Top advice
                error={errors.AppointmentDescription}
            >
                <input
                    type="text"
                    name="AppointmentDescription"
                    value={appointment.AppointmentDescription}
                    onChange={handleChange2}
                />
               

            </FormItem>
            




            <button disabled={appointment.AppointmentDescription.length >= 2 ? false:  true } onClick={handleSubmit} className="buttonStuff">Book Appointment</button>

        </form>
        //<p>{appointment.AppointmentDescription.length < 2 ? "" : ""}</p>
    );
}