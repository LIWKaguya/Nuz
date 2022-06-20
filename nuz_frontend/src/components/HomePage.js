import { useEffect, useState } from "react"

import postsService from '../services/posts'

const HomePage = ({ user, setUser}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postsService.getAll().then(initPosts => {
            setPosts(initPosts)
        })
    }, [])

    const handleLogout = () => {
        setUser(null)
        window.localStorage.clear()
    }

    return (
        <>
            <div>
                <h1>Welcome to Nuz, {user.username}</h1>
            </div>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {posts.map(post => <li key={post.id}>{post.content} by {post.user.username}</li>)}
            </ul>
        </>
    )
}

export default HomePage