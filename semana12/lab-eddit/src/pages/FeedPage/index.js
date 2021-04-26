import { useHistory } from "react-router"
import { goToLogin, goToCadastro, goToFeed, goToPost } from "../../routes/coordinator"


export default function FeedPage() {

    const history = useHistory()
    
    return <div>
        <h1>FeedPage</h1>
        <button onClick={() => goToLogin(history)}>Login</button>
        <button onClick={() => goToCadastro(history)}>Cadastro</button>
        <button onClick={() => goToFeed(history)}>Feed</button>
        <button onClick={() => goToPost(history, "teste")}>Post</button>
    </div>
}