import { useEffect, useState } from "react"

import postsService from '../services/posts'

const HomePage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postsService.getAll().then(initPosts => {
            setPosts(initPosts)
        })
    }, [])

    return (
        <>
            <h1>Welcome to Nuz</h1>
            <ul>
                {posts.map(post => <li key={post.id}>{post.content} by {post.user.username}</li>)}
            </ul>
        </>
    )
}

export default HomePage