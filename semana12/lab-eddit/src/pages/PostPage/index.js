import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useProtectPage } from "../../hooks/useProtectedPage"
import { baseUrl } from "../../parameters"
import { goToFeed, goToLogout } from "../../routes/coordinator"
import  ThumbUpWhite from '../../static/ThumbUpWhite.svg'
import  ThumbUpBlack from '../../static/ThumbUpBlack.svg'
import  ThumbDownWhite from '../../static/ThumbDownWhite.svg'
import  ThumbDownBlack from '../../static/ThumbDownBlack.svg'



export default function PostPage() {

    useProtectPage()

    const formDefault = {text: ""}

    const history = useHistory()
    const postId = useParams().id
    const [post, setPost] = useState({})
    const [form, setForm] = useState(formDefault)
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
    
    const onChange = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]: value})
     }
  
    const createComment = async (event) => {

        event.preventDefault()

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}

        try {
            await axios.post(`${baseUrl}/posts/${postId}/comment`, form, headers)
            window.alert("Comentário Criado com Sucesso!")
            getPostDetails()
        }
        catch(error) {
            console.log(error)
        }
    }

    const votePost = async (postId, direction) => {

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}

        try {
            await axios.put(`${baseUrl}/posts/${postId}/vote`, {direction}, headers)
            getPostDetails()
        }
        catch (error) {
            console.log(error)
        }
    }

    const voteComment = async (commentId, direction) => {

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}

        try {
            await axios.put(`${baseUrl}/posts/${postId}/comment/${commentId}/vote`, {direction}, headers)
            getPostDetails()
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
        {!loading &&  <p>
                        {post.userVoteDirection === 1 ? <img src={ThumbUpBlack} onClick={() => votePost(post.id, 0)}/> : <img src={ThumbUpWhite} onClick={() => votePost(post.id, 1)}/>}
                            {post.votesCount}
                        {post.userVoteDirection === -1 ? <img src={ThumbDownBlack} onClick={() => votePost(post.id, 0)}/> : <img src={ThumbDownWhite} onClick={() => votePost(post.id, -1)}/>}
                    </p>}
        <form onSubmit={createComment}>
            <input name="text" type="text" onChange={onChange} placeholder="text" required/>
            <button>Comentar</button>
        </form>
        {!loading && post.comments.map((comment) => {
            return <div key={comment.id}>
                <h1>{comment.username}: {comment.text}</h1>
                <p>
                    {comment.userVoteDirection === 1 ? <img src={ThumbUpBlack} onClick={() => voteComment(comment.id, 0)}/> : <img src={ThumbUpWhite} onClick={() => voteComment(comment.id, 1)}/>}
                        {comment.votesCount}
                    {comment.userVoteDirection === -1 ? <img src={ThumbDownBlack} onClick={() => voteComment(comment.id, 0)}/> : <img src={ThumbDownWhite} onClick={() => voteComment(comment.id, -1)}/>}
                </p><hr/>
                </div>
        })}
    </div>
}