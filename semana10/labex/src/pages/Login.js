import { useHistory } from 'react-router-dom'
import { goToAdminHome, goToHome } from '../routes/coordinator'


export default function Login() {

    const history = useHistory()

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToAdminHome(history)}>Página de Administrador</button>
        </div>
    )
}