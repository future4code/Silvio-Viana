export default function ShowTrips(props) {

    return (
        <section>
            {props.trips.map((trip) => {
                return (
                    <article key={trip.id}>
                        <p><b>Nome: </b>{trip.name}</p>
                        <p><b>Descrição: </b>{trip.description}</p>
                        <p><b>Planeta: </b>{trip.planet}</p>
                        <p><b>Duração: </b>{trip.durationInDays} dias</p>
                        <p><b>Data: </b>{trip.date}</p><hr/>
                    </article>
                )
            })}
        </section>)
}