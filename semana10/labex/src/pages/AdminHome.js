import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { goToCreateTrip, goToHome } from '../routes/coordinator'
import { baseUrl } from '../parameters'
import { useProtectedPage } from '../customHooks'
import axios from 'axios'
import ShowTripsAdmin from '../components/ShowTripsAdmin'


export default function AdminHome() {

    useProtectedPage()

    const history = useHistory()
    const [trips, setTrips] = useState([])

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

    const logout = () => {

        window.localStorage.removeItem("token")
        history.replace("/login")
    }

    return (
        <div>
            <h1>Página de Administrador</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToCreateTrip(history)}>Criar Viagem</button>
            <button onClick={logout}>Logout</button>
            <ShowTripsAdmin trips={trips} history={history} deleteTrip={deleteTrip}/>
        </div>
    )
}