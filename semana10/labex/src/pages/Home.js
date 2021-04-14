import { useHistory } from 'react-router-dom'
import { goToListTrips, goToLogin } from '../routes/coordinator'


export default function Home() {

    const history = useHistory()
    
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => goToListTrips(history)}>Ver Viagens</button>
            <button onClick={() => goToLogin(history)}>Área Administrativa</button>
        </div>
    )
}