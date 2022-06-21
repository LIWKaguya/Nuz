import { useEffect, useState } from "react"

import postsService from '../services/posts'
import UploadSection from "./UploadSection"

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
            <div>
            <button onClick={handleLogout}>Logout</button>
            </div>
            <UploadSection setPosts={setPosts} posts={posts}/>
            
        </>
    )
}

export default HomePage