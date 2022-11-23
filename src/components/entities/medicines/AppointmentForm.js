import { useState, useEffect } from 'react';
import API from '../../api/API.js';
import FormItem from '../../UI/Form.js';

const emptyAppointment = {
    PersonalTrainerID: 1,
    PersonalTrainerName: 1,
    AppointmentDescription: "",
    AppointmentAvailabilityID: 10,
    AppointmentClientID: 10,
    AvailabilityPersonalTrainerID: 2
}


export default function AppointmentForm({ initialAppointment = emptyAppointment }) {

    // Initialisation ---
    // State ---
    const [appointment, setAppointment] = useState(initialAppointment);

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
    const getTrainerAvailability = async () => {
        const response = await API.get('/availability/personaltrainers');
        response.isSuccess
            ? setTrainerAvailability(response.result)
            : setLoadingAvailabilityMessage(response.message)

    }
    useEffect(() => { getTrainerAvailability() }, []);

    // Handlers ---
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'PersonalTrainerID') ? parseInt(value) : value;
        setAppointment({ ...appointment, [name]: newValue });
    };
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
                                value={appointment.PersonalTrainerID}
                                onChange={handleChange}
                            >

                                <option value="0" disabled>Select personal trainer</option>

                                {
                                    personalTrainers.map((trainer) => <option key={trainer.PersonalTrainerName} value={trainer.PersonalTrainerID}>{trainer.PersonalTrainerName}</option>)
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
                    !trainerAvailability
                        ? <p>{loadingAvailabilityMessage}</p>
                        : trainerAvailability.length === 0
                            ? <p>No availability found</p>
                            : <select
                                name="AvailabilityPersonalTrainerID"
                                value={appointment.AvailabilityPersonalTrainerID}
                                onChange={handleChange}
                            >

                                <option value="0" disabled>Select personal trainer</option>

                                {
                                    trainerAvailability.map((availabilitys) => <option key={availabilitys.AvailabilityPersonalTrainerID} value={availabilitys.AvailabilityPersonalTrainerID}>{availabilitys.AvailabilityID}</option>)
                                }

                            </select>
                }
            </FormItem>



                
                <button>Book Appointment</button>
        </form>

    );
}