import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { goToListTrips } from '../routes/coordinator'
import { applyForm, baseUrl } from '../parameters'
import axios from 'axios'
import CandidateForm from '../components/CandidateForm'
import { CandidateFormBox } from '../styled'


export default function ApplicationForm() {
    
    const history = useHistory()
    const [trips, setTrips] = useState([])
    const [tripValue, setTripValue] = useState("")
    const [tripId, setTripId] = useState("")
    const [form, setForm] = useState(applyForm)

    useEffect(() => {   

        getTrips()
    }, [])
    
    const onChange = (event) => {

        const { name, value } = event.target
        setForm({...form, [name]: value})
    }

    const onChangeTrip = (event) => {

        setTripValue(event.target.value)
        setTripId(event.target[event.target.selectedIndex].id)       
    }

    const getTrips = async () => {
        try {
            const response = await axios.get(`${baseUrl}/trips`)
            setTrips(response.data.trips)
        }
        catch (error) {
            console.log(error)
        }
    }

    const applyToTrip = async (event) => {

        event.preventDefault()

        try {
            await axios.post(`${baseUrl}/trips/${tripId}/apply`, form)
            window.alert("Inscrição feita com sucesso")
            setForm(applyForm)
            setTripValue("")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <CandidateFormBox>
            <h1>Inscrever-se para uma Viagem</h1>
            <button onClick={() => goToListTrips(history)}>Voltar</button>
            <CandidateForm trips={trips} tripValue={tripValue} 
            form={form} onChange={onChange} 
            onChangeTrip={onChangeTrip} applyToTrip={applyToTrip}/>
        </CandidateFormBox>
    )
}