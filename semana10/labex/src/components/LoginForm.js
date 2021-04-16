import { LoginFormCard } from "../styled";

export default function LoginForm(props) {

    return (
        <LoginFormCard onSubmit={props.enterAdmin}>

            <h3>Login</h3>
            <input name="email" type="email" onChange={props.onChange} required/>

            <h3>Senha</h3>
            <input name="password" type="password" onChange={props.onChange} required/>

            <button>Entrar</button>
        </LoginFormCard>)
}