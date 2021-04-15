import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { goToListTrips } from '../routes/coordinator'
import { applyForm, baseUrl, listaPaises } from '../parameters'


export default function ApplicationForm() {
    
    const [trips, setTrips] = useState([])
    const [tripId, setTripId] = useState("")
    const [tripValue, setTripValue] = useState("")
    const [form, setForm] = useState(applyForm)
    const history = useHistory()
    
    const onChange = (event) => {
        const { name, value } = event.target
        setForm({...form, [name]: value})
    }

    const onChangeTrip = (event) => {
        setTripId(event.target[event.target.selectedIndex].id)
        setTripValue(event.target.value)
    }

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
        <div>
            <h1>Inscrever-se para uma Viagem</h1>
            <button onClick={() => goToListTrips(history)}>Voltar</button>
            <form onSubmit={applyToTrip}>
                <select value={tripValue} onChange={onChangeTrip} required >
                <option id=""></option>
                    {trips.map((trip) => {
                        return <option key={trip.id} id={trip.id}>{trip.name}</option>
                    })}
                </select>

                <input name="name" value ={form.name} onChange={onChange} placeholder="Nome" pattern="[A-Za-z ]{3,}" required />
                <input name="age" value ={form.age} onChange={onChange} placeholder="Idade" type="number" min="18" required />
                <input name="applicationText" value ={form.applicationText} onChange={onChange} placeholder="Texto de Candidatura" pattern="[A-Za-z0-9 ]{30,}" required />
                <input name="profession" value ={form.profession} onChange={onChange} placeholder="Profissão" pattern="[A-Za-z0-9 ]{10,}"  required/>

                <select name="country" onChange={onChange} value={form.country} required>
                    <option></option>
                    {listaPaises.map((nacao) => {
                        return <option key={nacao.ordem}>{nacao.nome}</option>
                    })}
                </select>
                <button>Enviar</button>
            </form>
        </div>
    )
}