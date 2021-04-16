import { TripsBox, TripCard } from "../styled"

export default function ShowTrips(props) {

    return (
        <TripsBox>
            {props.trips.map((trip) => {
                return (
                    <TripCard key={trip.id}>
                        <p><b>Nome: </b>{trip.name}</p>
                        <p><b>Descrição: </b>{trip.description}</p>
                        <p><b>Planeta: </b>{trip.planet}</p>
                        <p><b>Duração: </b>{trip.durationInDays} dias</p>
                        <p><b>Data: </b>{trip.date}</p>
                    </TripCard>
                )
            })}
        </TripsBox>)
}