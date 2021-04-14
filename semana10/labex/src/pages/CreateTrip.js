import { useHistory } from 'react-router-dom'
import { goToAdminHome } from '../routes/coordinator'
import { useProtectedPage } from '../customHooks'


export default function CreateTrip() {
    useProtectedPage()

    const history = useHistory()

    return (
        <div>
            <h1>Criar Viagem</h1>
            <button onClick={() => goToAdminHome(history)}>Voltar</button>
        </div>
    )
}