import { useState } from 'react'
import { baseUrl, createForm } from '../parameters'
import { useProtectedPage } from '../customHooks'
import axios from 'axios'
import CreateForm from '../components/CreateForm'
import { CreateFormBox, PageTitle } from '../styled'


export default function CreateTrip() {

    useProtectedPage()

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
        <CreateFormBox>
            <PageTitle>Criar Viagem</PageTitle>
            <CreateForm form={form} onChange={onChange} createTrip={createTrip} />
        </CreateFormBox>
    )
}