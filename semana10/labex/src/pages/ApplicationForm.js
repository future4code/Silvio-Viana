import { useHistory } from 'react-router-dom'
import { goToListTrips } from '../routes/coordinator'


export default function ApplicationForm() {
    
    const history = useHistory()

    return (
        <div>
            <h1>Inscrever-se para uma Viagem</h1>
            <button onClick={() => goToListTrips(history)}>Voltar</button>
        </div>
    )
}