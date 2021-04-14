import { useHistory } from 'react-router-dom'
import { goToAdminHome } from '../routes/coordinator'
import { useInput, useProtectedPage } from '../customHooks'
import axios from 'axios'
import { baseUrl } from '../parameters'


export default function CreateTrip() {
    useProtectedPage()

    const history = useHistory()
    const [destino, setDestino, clearDestino] = useInput()
    const [nome, setNome, clearNome] = useInput()
    const [descricao, setDescricao, clearDescricao] = useInput()
    const [data, setData, clearData] = useInput()
    const [duracao, setDuracao, clearDuracao] = useInput()


    const createTrip = async () => {
        if (!destino || !nome || !descricao || !data || !duracao) {
            window.alert("Você tem que escrever todos os valores")
            return
        }
        
        const body = {
            name: nome,
            planet: destino,
            date: data,
            description: descricao,
            durationInDays: duracao
        }
        const headers = {headers: {'auth': window.localStorage.getItem("token")}}
        try {
            await axios.post(`${baseUrl}/trips`, body, headers)
            window.alert("Viagem criada com sucesso")
            clearDestino()
            clearNome()
            clearDescricao()
            clearData()
            clearDuracao()
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Criar Viagem</h1>
            <button onClick={() => goToAdminHome(history)}>Voltar</button>
            <select value={destino} onChange={setDestino}>
                <option></option>
                <option>Lua</option>
                <option>Sol</option>
            </select>
            <input value={nome} onChange={setNome} placeholder="Nome"/>
            <input value={descricao} onChange={setDescricao} placeholder="Descrição"/>
            <input value={data} onChange={setData} type="date" placeholder="Data"/>
            <input value={duracao} onChange={setDuracao} type="number"placeholder="Duração em Dias"/>
            <button onClick={createTrip}>Criar</button>
        </div>
    )
}