import { useHistory, useParams } from 'react-router-dom'
import { goToAdminHome } from '../routes/coordinator'
import { useProtectedPage } from '../customHooks'


export default function TripDetails() {
    useProtectedPage()

    const history = useHistory()
    const params = useParams()

    return (
        <div>
            <h1>Detalhes da Viagem</h1>
            <button onClick={() => goToAdminHome(history)}>Voltar</button>
            <p>Parâmetros: {params.id}</p>
        </div>
    )
}