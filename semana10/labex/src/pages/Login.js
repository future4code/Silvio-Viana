import { useHistory } from 'react-router-dom'
import { goToAdminHome, goToHome } from '../routes/coordinator'
import { useInput } from '../customHooks'
import axios from 'axios'
import { baseUrl } from '../parameters'
import { useEffect } from 'react'


export default function Login() {

    const history = useHistory()
    const [login, setLogin] = useInput()
    const [senha, setSenha] = useInput()

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        if (token !== null) {
            history.replace("/admin/trips/list")
        }
    }, [])

    const entrarAdmin = async () => {
        const body = {
            email: login,
            password: senha
        }
        try {
            const response = await axios.post(`${baseUrl}/login`, body)
            window.localStorage.setItem("token", response.data.token)
            goToAdminHome(history)
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <input onChange={setLogin} placeholder="Login"/>
            <input onChange={setSenha} placeholder="Senha"/>
            <button onClick={entrarAdmin}>Entrar</button>

        </div>
    )
}