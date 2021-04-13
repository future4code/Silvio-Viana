import { useHistory } from 'react-router-dom'
import { goToCreateTrip, goToHome, goToTripDetails } from '../routes/coordinator'


export default function AdminHome() {

    const history = useHistory()

    return (
        <div>
            <h1>Página de Administrador</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToCreateTrip(history)}>Criar Viagem</button>
            <button onClick={() => goToTripDetails(history, "Teste")}>Viagem 1</button>
        </div>
    )
}