import { useHistory, useParams } from 'react-router-dom'
import { goToAdminHome } from '../routes/coordinator'
import { useProtectedPage } from '../customHooks'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../parameters'


export default function TripDetails() {
    useProtectedPage()

    const history = useHistory()
    const params = useParams()
    const [trip, setTrip] = useState({})
    const [carregado, setCarregado] = useState(false)

    useEffect(() => {
        getTripDetails()
    }, [])

    const getTripDetails = async () => {
        const headers = {headers: {'auth': window.localStorage.getItem("token")}}
        try {
            const response = await axios.get(`${baseUrl}/trip/${params.id}`, headers)
            setTrip(response.data.trip)
            setCarregado(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    const decideCandidate = async (choice, candidateId) => {
        const body = {
            approve: choice
        }
        const headers = {headers: {'auth': window.localStorage.getItem("token")}}
        try {
            await axios.put(`${baseUrl}/trips/${params.id}/candidates/${candidateId}/decide`, body, headers)
            setCarregado(false)
            getTripDetails()

        }
        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Detalhes da Viagem</h1>
            <button onClick={() => goToAdminHome(history)}>Voltar</button>

            <section key={trip.id}>
                <p><b>Nome: </b>{trip.name}</p>
                <p><b>Descrição: </b>{trip.description}</p>
                <p><b>Planeta: </b>{trip.planet}</p>
                <p><b>Duração: </b>{trip.durationInDays} dias</p>
                <p><b>Data: </b>{trip.date}</p>
            </section><hr/>

            <section>
                <h1>Candidatos Pendentes</h1>
                {carregado && trip.candidates.map((candidate) => {
                    return  <div key={candidate.id}>
                                <p><b>Nome: </b>{candidate.name}</p>
                                <p><b>Idade: </b>{candidate.age}</p>
                                <p><b>Profissão: </b>{candidate.profession}</p>
                                <p><b>País </b>{candidate.country}</p>
                                <p><b>Texto de Candidatura: </b>{candidate.applicationText}</p>
                                <button onClick={() => decideCandidate(true, candidate.id)}>Aprovar</button>
                                <button onClick={() => decideCandidate(false, candidate.id)}>Reprovar</button><hr/>
                            </div>
                })}
            </section><hr/>

            <section>
                <h1>Candidatos Aprovados</h1>
                {carregado && trip.approved.map((candidate) => {
                    return <h1>{candidate.name}</h1>
                })}
            </section><hr/>

        </div>
    )
}