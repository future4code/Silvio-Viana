import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { goToHome, goToApplicationForm } from '../routes/coordinator'
import { baseUrl } from '../parameters'
import axios from 'axios'
import ShowTrips from '../components/ShowTrips'


export default function ListTrips() {

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
    
    return (
        <div>
            <h1>Lista de Viagens</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToApplicationForm(history)}>Inscrever-se</button><hr/>
            <ShowTrips trips={trips}/>
        </div>
    )
}