import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { goToHome, goToApplicationForm } from '../routes/coordinator'
import { baseUrl } from '../parameters'
import axios from 'axios'
import ShowTrips from '../components/ShowTrips'
import { PageTitle } from '../styled'


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
            <PageTitle>Lista de Viagens</PageTitle>
            <ShowTrips trips={trips}/>
        </div>
    )
}