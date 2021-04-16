import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { goToAdminHome, goToHome } from '../routes/coordinator'
import { baseUrl, loginForm } from '../parameters'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { LoginFormBox } from '../styled'


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

    const enterAdmin = async (event) => {

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
        <LoginFormBox>
            <h1>Login</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <LoginForm onChange={onChange} enterAdmin={enterAdmin} />
        </LoginFormBox>
    )
}