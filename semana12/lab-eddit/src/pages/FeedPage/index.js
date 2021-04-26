import { useHistory } from "react-router"
import { useProtectPage } from "../../hooks/useProtectedPage"
import { goToPost, goToLogout } from "../../routes/coordinator"


export default function FeedPage() {

    useProtectPage()

    const history = useHistory()
    
    return <div>
        <h1>FeedPage</h1>
        <button onClick={() => goToPost(history, "teste")}>Post</button>
        <button onClick={() => goToLogout(history)}>Logout</button>
    </div>
}