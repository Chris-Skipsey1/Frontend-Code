import { useState, useEffect } from 'react';
import API from '../../api/API.js';
import FormItem from '../../UI/Form.js';

const emptyAppointment = {
    PersonalTrainerID: 0,
    PersonalTrainerName: 1,
    AppointmentDescription: "Dummy",
    AppointmentAvailabilityID: 10,
    AppointmentClientID: 10,
    AvailabilitySlotID: 1,
    AvailabilityPersonalTrainerID: 0
}


export default function AppointmentForm({ onSubmit, initialAppointment = emptyAppointment }) {

    // Initialisation ---
    const appointmentsEndpoint = '/appointments';

    // State ---
    const [appointment, setAppointment] = useState(initialAppointment);
    const [personalTrainerID, setPersonalTrainerID] = useState(0);

    const [personalTrainers, setPersonalTrainers] = useState(null);
    const [loadingTrainersMessage, setLoadingTrainersMessage] = useState('Loading trainers ...');

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
    };

    const descriptionChange = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'AppointmentDescription') ? parseInt(value) : value;

    };

    const handleSubmit = () => {

        onSubmit(appointment);
    }

    //const isValidAppointment = (appointment) => {
    //  let isAppointmentValid = true;
    //  Object.keys(appointment).forEach((key) => {
    //   if (isValidAppointment[key](module[key])) {
    //   errors[key] = null;
    //    } else {
    //       errors[key] = errorMessage[key];
    //       isAppointmentValid = false;
    //      }
    //   });
    //  return isAppointmentValid;
    //  }

    //const handleSubmit = async (appointment) => {

        //const response = await API.post(appointmentsEndpoint, appointment);
    //};



    // View ---
    return (
        <form className="BorderedForm">
            <FormItem
                label="Personal Trainer Name" // Top label
                htmlFor="PersonalTrainerID"
                advice="Choose a personal trainer name" // Top advice
                error={null}
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
                                    personalTrainers.map((trainer) => <option key={trainer.PersonalTrainerID} value={trainer.PersonalTrainerID}>{trainer.PersonalTrainerName} ({trainer.PersonalTrainerID})</option>)
                                }

                            </select>
                }
            </FormItem>


            <FormItem
                label="Personal Trainer Availability" // Top label
                htmlFor="AvailabilityPersonalTrainerID"
                advice="Choose the personal trainer's availability" // Top advice
                error={null}
            >
                {

                    !personalTrainerID
                        ? <p>To see a date, first you must select a personal trainer from above.</p>
                        : !trainerAvailability
                            ? <p>{loadingAvailabilityMessage}</p>
                            : trainerAvailability.length === 0
                                ? <p>No availability found</p>
                                : <select
                                    name="AvailabilityPersonalTrainerID"
                                    value={appointment.AvailabilityPersonalTrainerID}
                                    onChange={handleChange2}
                                >

                                    <option value="0" disabled>Select personal trainer</option>

                                    {
                                        trainerAvailability.map((availabilitys) => <option key={availabilitys.AvailabilitySlotID} value={availabilitys.AvailabilitySlotID}>{availabilitys.DateAndTime} ({availabilitys.AvailabilitySlotID})</option>)
                                    }

                                </select>
                }
            </FormItem>


            <FormItem
                label="Description"
                htmlFor="AppointmentDescription"
                advice="Please enter a description!"
                error={"You need to enter a description"}
            >
                <input
                    type="text"
                    name="AppointmentDescription"
                    value={null}
                    onChange={descriptionChange}
                />
            </FormItem>




            <button onClick={handleSubmit}>Book Appointment</button>

        </form>

    );
}