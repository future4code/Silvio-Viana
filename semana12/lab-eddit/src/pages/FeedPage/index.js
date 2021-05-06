import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useProtectPage } from "../../hooks/useProtectedPage"
import { goToPost, goToLogout } from "../../routes/coordinator"
import { baseUrl } from "../../parameters"
import  ThumbUpWhite from '../../static/ThumbUpWhite.svg'
import  ThumbUpBlack from '../../static/ThumbUpBlack.svg'
import  ThumbDownWhite from '../../static/ThumbDownWhite.svg'
import  ThumbDownBlack from '../../static/ThumbDownBlack.svg'


export default function FeedPage() {

    useProtectPage()

    const formDefault = {title: "", text: ""}

    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState(formDefault)
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

    const onChange = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]: value})
     }

    const createPost = async (event) => {

        event.preventDefault()

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}

        try {
            await axios.post(`${baseUrl}/posts`, form, headers)
            window.alert("Post Criado com Sucesso!")
            getPosts()
            setForm(formDefault)
        }
        catch(error) {
            console.log(error)
        }
    }

    const votePost = async (postId, direction) => {

        const headers = {headers: {Authorization: window.localStorage.getItem("token")}}

        try {
            await axios.put(`${baseUrl}/posts/${postId}/vote`, {direction}, headers)
            getPosts()
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return <div>
        <h1>Feed</h1>
        <button onClick={() => goToLogout(history)}>Logout</button><hr/>

        {loading && <h1>Carregando...</h1>}

        {!loading && <form onSubmit={createPost}>
            <input name="title" type="text" value={form.title} onChange={onChange} placeholder="Título" required/>
            <input name="text" type="text" value={form.text} onChange={onChange} placeholder="Texto" required/>
            <button>Postar</button><hr/>
        </form>}

        {!loading && posts.map((post) => {
            return <div key={post.id}>
                    <h3>{post.username}</h3>
                    <div onClick={() => goToPost(history, post.id)}>
                        <h1>{post.title}</h1>
                        <p>{post.text}</p>
                    </div>
                    <p>{post.commentsCount} comentários</p>
                    <p>
                        {post.userVoteDirection === 1 ? <img src={ThumbUpBlack} onClick={() => votePost(post.id, 0)}/> : <img src={ThumbUpWhite} onClick={() => votePost(post.id, 1)}/>}
                            {post.votesCount}
                        {post.userVoteDirection === -1 ? <img src={ThumbDownBlack} onClick={() => votePost(post.id, 0)}/> : <img src={ThumbDownWhite} onClick={() => votePost(post.id, -1)}/>}
                    </p><hr/>
                </div>
        })}
    </div>
}