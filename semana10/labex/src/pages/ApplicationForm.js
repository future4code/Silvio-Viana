import { useState, useEffect } from 'react'
import { applyForm, baseUrl } from '../parameters'
import axios from 'axios'
import CandidateForm from '../components/CandidateForm'
import { CandidateFormBox, PageTitle } from '../styled'


export default function ApplicationForm() {
    
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
            <PageTitle>Inscrever-se para uma Viagem</PageTitle>
            <CandidateForm trips={trips} tripValue={tripValue} 
            form={form} onChange={onChange} 
            onChangeTrip={onChangeTrip} applyToTrip={applyToTrip}/>
        </CandidateFormBox>
    )
}