import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useProtectPage } from "../../hooks/useProtectedPage"
import { baseUrl } from "../../parameters"
import { goToFeed, goToLogout } from "../../routes/coordinator"


export default function PostPage() {

    useProtectPage()

    const history = useHistory()
    const postId = useParams().id
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getPostDetails()
    }, [])

    const getPostDetails = async () => {

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}

        try {
            const response = await axios.get(`${baseUrl}/posts/${postId}`, headers)
            setPost(response.data.post)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return <div>
        <h1>PostPage</h1>
        <button onClick={() => goToFeed(history)}>Feed</button>
        <button onClick={() => goToLogout(history)}>Logout</button>
        {!loading && <h1>{post.title}</h1>}
        {!loading && <p>{post.text}</p>}
        {!loading && post.comments.map((comment) => {
            return <div key={comment.id}>
                <h1>{comment.username}: {comment.text}</h1><hr/>
                </div>
        })}
    </div>
}