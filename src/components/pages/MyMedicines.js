import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import MedicineCard from '../entities/medicines/MedicineCard.js';
import { useState } from "react";
import API from '../api/API.js';

const medicineObject = {
  MedicineID: 5,
  MedicineName: "Fosamax",
  MedicineDescription: "Helps to treat and prevent bone disease.",
  MedicineTakenDate: "04/05/2023",
  MedicineURI: "https://i.imgur.com/gyUHd2X.jpeg",
  PrescriptionDosage: 84
}

function MyMedicines() {
  // Initialisation
  const loggedInUserID = 5;
  const endpoint = `/medicines/clients/${loggedInUserID}`;
  const medicinesEndpoint = '/medicines';
  const [medicines, , loadingMessage,] = useLoad(endpoint);
  //View
  const [isFavourite, isSetFavourite] = useState();

  const handleMedicine = async (medicine) => {
    //exerciseObject.Favourite = isFavourite;
    medicine.MedicineFavourite = medicine.MedicineFavourite ? 0 : 1;
    const response = await API.put(`${medicinesEndpoint}/${medicine.MedicineID}`, medicine);
    console.log(medicine)
    isSetFavourite(!isFavourite);
  }



  return (
    <section>
      <h2>My Medicines</h2>
      <p>Medicines that you need to take.</p>
      {
        !medicines
          ? <p>{loadingMessage}</p>
          : medicines.length === 0
            ? <p>No medicines found</p>
            : <Card.Container>
              {
                medicines.map((medicine) =>
                  <Card key={medicine.MedicineID}>
                    <MedicineCard medicine={medicine} />
                    <center><button className="secondButtonStuff" style={{ background: medicine.MedicineFavourite ? "red" : "green" }} onClick={() => handleMedicine(medicine)}>
                      {medicine.MedicineFavourite ? 'Remove medicine as taken' : 'I have taken this medicine today'}</button></center>
                  </Card>
                )
              }
            </Card.Container>
      }
    </section>
  );
}
export default MyMedicines;