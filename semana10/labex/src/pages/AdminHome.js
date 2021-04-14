import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { goToCreateTrip, goToHome, goToTripDetails } from '../routes/coordinator'
import { useProtectedPage } from '../customHooks'
import { baseUrl } from '../parameters'


export default function AdminHome() {
    useProtectedPage()

    const [trips, setTrips] = useState([])
    const history = useHistory()

    useEffect(() => {
        getTrips()
    }, [])

    const getTrips = async () => {
        try {
            const response = await axios.get(`${baseUrl}/trips`)
            setTrips(response.data.trips)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteTrip = async (id) => {
        if (!window.confirm("Você tem certeza que quer apagar essa viagem?")) {
            return
        }

        const headers = {headers: {'auth': window.localStorage.getItem("token")}}
        try {
            await axios.delete(`${baseUrl}/trips/${id}`, headers)
            window.alert("Viagem Apagada com Sucesso")
            getTrips()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Página de Administrador</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToCreateTrip(history)}>Criar Viagem</button><hr/>
            {trips.map((trip) => {
                return <div key ={trip.id}>
                    <h1 onClick={() => goToTripDetails(history, trip.id)}>{trip.name}</h1>
                    <button onClick={() => deleteTrip(trip.id)}>Apagar</button><hr/>
                    </div>
            })}
        </div>
    )
}