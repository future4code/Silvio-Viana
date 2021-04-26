import { useHistory, useParams } from "react-router"
import { goToLogin, goToCadastro, goToFeed, goToPost } from "../../routes/coordinator"


export default function PostPage() {

    const history = useHistory()
    const postId = useParams().id
    
    return <div>
        <h1>PostPage</h1>
        <h1>{postId}</h1>
        <button onClick={() => goToLogin(history)}>Login</button>
        <button onClick={() => goToCadastro(history)}>Cadastro</button>
        <button onClick={() => goToFeed(history)}>Feed</button>
        <button onClick={() => goToPost(history, "teste")}>Post</button>
    </div>
}