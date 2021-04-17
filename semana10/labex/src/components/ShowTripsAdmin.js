import { goToTripDetails } from "../routes/coordinator"
import { AdminTripBox, AdminTripCard } from "../styled"

export default function ShowTripsAdmin(props) {

    return (
        <AdminTripBox>
            {props.trips.map((trip) => {
                return <AdminTripCard key ={trip.id}>
                    <h1 onClick={() => goToTripDetails(props.history, trip.id)}>{trip.name}</h1>
                    <button onClick={() => props.deleteTrip(trip.id)}>Apagar</button>
                    </AdminTripCard>
            })}
            {props.trips.length === 0 && <h1>Não Há Viagens Disponíveis</h1>}
        </AdminTripBox>)
}