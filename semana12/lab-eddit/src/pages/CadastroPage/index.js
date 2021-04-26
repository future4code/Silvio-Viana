import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import { useNonLoggedPage } from "../../hooks/useNonLoggedPage"
import { baseUrl } from "../../parameters"
import { goToLogin, goToFeed } from "../../routes/coordinator"


export default function CadastroPage() {

    useNonLoggedPage()

    const formDefault = {email: "", password: "", username: ""}

    const history = useHistory()
    const [form, setForm] = useState(formDefault)

    const onChange = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]: value})
     }

     const cadastrar = async (event) => {
        event.preventDefault()
        
        try {
            const response = await axios.post(`${baseUrl}/signup`, form)
            console.log(response)
            window.localStorage.setItem("token", response.data.token)
            goToFeed(history)
        }
        catch (error) {
            window.alert("Esse Email já está em uso")
        }
    }

    return <div>
        <h1>CadastroPage</h1>
        <button onClick={() => goToLogin(history)}>Login</button>

        <form onSubmit={cadastrar}>
            <input name="username" type="text" onChange={onChange} placeholder="username" required/>
            <input name="email" type="email" onChange={onChange} placeholder="email" required/>
            <input name="password" type="password" onChange={onChange} placeholder="password" required/>
            <button>Cadastrar</button>
        </form>
    </div>
}