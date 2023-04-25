import useLoad from '../api/useLoad.js';
import Card from '../UI/Card.js';
import ClientCard from '../entities/medicines/ClientCard.js';


function MyClients() {
  // Initialisation
  const endpoint = `/clients`;

  // useLoad


  // State-----

  const [clients, , loadingMessage,] = useLoad(endpoint);

  //const handleSubmit = (appointment) => {}



  //View
  return (
    <section>
      <h2>My Clients</h2>
      <p>Your clients.</p>

      <div><br></br></div>
      {
        !clients
          ? <p>{loadingMessage}</p>
          : clients.length === 0
            ? <p>No exercises found</p>
            : <Card.Container>
              {
                clients.map((client) =>
                  <ClientCard key={clients.ClientID} client={client} />
                )
              }
            </Card.Container>
      }
      
    </section>
  );
}
export default MyClients;