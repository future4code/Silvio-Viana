import { useHistory } from 'react-router-dom'
import { goToAdminHome, goToHome } from '../routes/coordinator'
import axios from 'axios'
import { baseUrl, loginForm } from '../parameters'
import { useEffect, useState } from 'react'


export default function Login() {

    const history = useHistory()
    const [form, setForm] = useState(loginForm)

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        if (token !== null) {
            history.replace("/admin/trips/list")
        }
    }, [])

    const onChange = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const entrarAdmin = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${baseUrl}/login`, form)
            window.localStorage.setItem("token", response.data.token)
            goToAdminHome(history)
        }
        catch (error) {
            console.log(error)
            window.alert("Usuário ou Senha inválidos")
        }

    }
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <form onSubmit={entrarAdmin}>
                <input type="email" name="email" onChange={onChange} placeholder="Login" required/>
                <input type="password" name="password" onChange={onChange} placeholder="Senha" required/>
                <button>Entrar</button>
            </form>

        </div>
    )
}