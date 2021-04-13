import { useHistory } from 'react-router-dom'
import {goToHome, goToApplicationForm} from '../routes/coordinator'


export default function ListTrips() {
    
    const history = useHistory()

    return (
        <div>
            <h1>Lista de Viagens</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToApplicationForm(history)}>Inscrever-se</button>
        </div>
    )
}