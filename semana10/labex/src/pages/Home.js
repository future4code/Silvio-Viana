import { useHistory } from 'react-router-dom'
import { goToAdminHome, goToListTrips } from '../routes/coordinator'


export default function Home() {

    const history = useHistory()
    
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => goToListTrips(history)}>Ver Viagens</button>
            <button onClick={() => goToAdminHome(history)}>Área Administrativa</button>
        </div>
    )
}