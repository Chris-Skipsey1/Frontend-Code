import { useState, useEffect } from 'react';
import API from '../../api/API.js';
import FormItem from '../../UI/Form.js';

const emptyAppointment = {
    PersonalTrainerID: 1,
    PersonalTrainerName: 1,
    AppointmentDescription: "",
    AppointmentAvailabilityID: 10,
    AppointmentClientID: 10
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

    // Handlers ---
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'PersonalTrainerName') ? parseInt(value) : value;
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
                                    personalTrainers.map((trainer) => <option key={trainer.PersonalTrainerID} value={trainer.PersonalTrainerName}></option>)
                                }

                            </select>
                }
            </FormItem>


            <FormItem
                label="Personal Trainer Availability" // Top label
                htmlFor="PersonalTrainerAvailability"
                advice="Choose a personal trainer availability"
                error={null}
            >
                <select
                    name="PersonalTrainerAvailability"
                    value={appointment.PersonalTrainerAvailability}
                >
                    <option value="0" disabled>Select personal availability</option>

                    {
                        [1, 2, 3, 4, 5].map((trainerName) => <option key={trainerName}>{trainerName}</option>)
                    }
                </select>
            </FormItem>

            
        </form>

    );
}