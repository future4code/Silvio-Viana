import { useHistory, useParams } from "react-router"
import { useProtectPage } from "../../hooks/useProtectedPage"
import { goToFeed, goToLogout } from "../../routes/coordinator"


export default function PostPage() {

    useProtectPage()

    const history = useHistory()
    const postId = useParams().id
    
    return <div>
        <h1>PostPage</h1>
        <h1>{postId}</h1>
        <button onClick={() => goToFeed(history)}>Feed</button>
        <button onClick={() => goToLogout(history)}>Logout</button>
    </div>
}