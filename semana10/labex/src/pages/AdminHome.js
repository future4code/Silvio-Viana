import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { baseUrl } from '../parameters'
import { useProtectedPage } from '../customHooks'
import axios from 'axios'
import ShowTripsAdmin from '../components/ShowTripsAdmin'
import { PageTitle } from '../styled'


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

    return (
        <div>
            <PageTitle>Página de Administrador</PageTitle>
            <ShowTripsAdmin trips={trips} history={history} deleteTrip={deleteTrip}/>
        </div>
    )
}