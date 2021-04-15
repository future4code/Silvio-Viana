import { useHistory } from 'react-router-dom'
import { goToAdminHome } from '../routes/coordinator'
import { useProtectedPage } from '../customHooks'
import axios from 'axios'
import { baseUrl, createForm } from '../parameters'
import { useState } from 'react'


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
            <form onSubmit={createTrip}>
                <select name="planet" value={form.planet} onChange={onChange} required >
                    <option></option>
                    <option>Lua</option>
                    <option>Sol</option>
                </select>
                <input name="name" value={form.name} onChange={onChange} placeholder="Nome" pattern="[a-zA-Z0-9 ]{5,}"required />
                <input name="description" value={form.description} onChange={onChange} placeholder="Descrição" pattern="[a-zA-Z0-9 ]{30,}" required />
                <input name="date" value={form.date} onChange={onChange} type="date" placeholder="Data" min="2022-01-01" required />
                <input name="durationInDays" value={form.durationInDays} onChange={onChange} type="number" placeholder="Duração em Dias" min="50" required />
                <button>Criar</button>
            </form>
        </div>
    )
}