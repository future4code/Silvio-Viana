import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useProtectPage } from "../../hooks/useProtectedPage"
import { goToPost, goToLogout } from "../../routes/coordinator"
import { baseUrl } from "../../parameters"


export default function FeedPage() {

    useProtectPage()

    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}
        
        try {
            const response = await axios.get(`${baseUrl}/posts`, headers)
            setPosts(response.data.posts)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return <div>
        <h1>FeedPage</h1>
        <button onClick={() => goToPost(history, "teste")}>Post</button>
        <button onClick={() => goToLogout(history)}>Logout</button>
        {!loading && posts.map((post) => {
            return <div key={post.id} onClick={() => goToPost(history, post.id)}>
                    <h1>{post.title}</h1>
                    <p>{post.text}</p>
                    <p>{post.username}</p>
                    <p>Votos: {post.votesCount} </p>
                    <p>Comentários: {post.commentsCount} </p><hr/>
                </div>
        })}
    </div>
}