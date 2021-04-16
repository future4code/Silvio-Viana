export default function LoginForm(props) {

    return (
        <form onSubmit={props.enterAdmin}>
            <input name="email" type="email" onChange={props.onChange} placeholder="Login" required/>
            <input name="password" type="password" onChange={props.onChange} placeholder="Senha" required/>
            <button>Entrar</button>
        </form>)
}