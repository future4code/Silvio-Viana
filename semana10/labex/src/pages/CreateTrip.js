import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { goToAdminHome } from '../routes/coordinator'
import { baseUrl, createForm } from '../parameters'
import { useProtectedPage } from '../customHooks'
import axios from 'axios'
import CreateForm from '../components/CreateForm'


export default function CreateTrip() {

    useProtectedPage()

    const history = useHistory()
    const [form, setForm] = useState(createForm)

    const onChange = (event) => {

        const { name, value } = event.target
        setForm({...form, [name]: value})
    }

    const createTrip = async (event) => {

        event.preventDefault()

        const headers = {headers: {'auth': window.localStorage.getItem("token")}}
        
        try {
            await axios.post(`${baseUrl}/trips`, form, headers)
            window.alert("Viagem criada com sucesso")
            setForm(createForm)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Criar Viagem</h1>
            <button onClick={() => goToAdminHome(history)}>Voltar</button>
            <CreateForm form={form} onChange={onChange} createTrip={createTrip} />
        </div>
    )
}