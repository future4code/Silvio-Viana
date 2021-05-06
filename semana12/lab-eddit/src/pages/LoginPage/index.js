import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import { useNonLoggedPage } from "../../hooks/useNonLoggedPage"
import { baseUrl } from "../../parameters"
import { goToCadastro, goToFeed } from "../../routes/coordinator"


export default function LoginPage() {

    useNonLoggedPage()

    const formDefault = {email: "", password: ""}

    const history = useHistory()
    const [form, setForm] = useState(formDefault)
    
    const onChange = (event) => {
       const {name, value} = event.target
       setForm({...form, [name]: value})
    }

    const logar = async (event) => {
        event.preventDefault()
        
        try {
            const response = await axios.post(`${baseUrl}/login`, form)
            window.localStorage.setItem("token", response.data.token)
            goToFeed(history)
        }
        catch (error) {
            window.alert("Usuário e/ou Senha inválido(s)")
        }
    }
    
    return <div>
        <h1>Login</h1>

        <button onClick={() => goToCadastro(history)}>Cadastro</button>
        <form onSubmit={logar}>
            <input name="email" type="email" onChange={onChange} placeholder="email" required/>
            <input name="password" type="password" onChange={onChange} placeholder="password" required/>
            <button>Entrar</button>
        </form>
    </div>
}