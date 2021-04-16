import { goToTripDetails } from "../routes/coordinator"

export default function ShowTripsAdmin(props) {

    return (
        <section>
            {props.trips.map((trip) => {
                return <div key ={trip.id}>
                    <h1 onClick={() => goToTripDetails(props.history, trip.id)}>{trip.name}</h1>
                    <button onClick={() => props.deleteTrip(trip.id)}>Apagar</button><hr/>
                    </div>
            })}
        </section>)
}