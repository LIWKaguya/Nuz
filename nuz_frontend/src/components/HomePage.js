import { useEffect, useState } from "react"

import postsService from '../services/posts'
import usersService from '../services/users'
import UploadSection from "./UploadSection"
import Posts from "./Posts"

const HomePage = ({ user, setUser}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postsService.getAll().then(initPosts => {
            setPosts(initPosts)
        })
    }, [])

    useEffect(() => {
        usersService.getOne({
            id: user.id
        }).then(thisUser => {
            console.log(thisUser)
            setUser(thisUser)
        })
    }, [setUser, user.id])

    console.log(user)

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
            <Posts posts={posts} user={user} setPosts={setPosts}/>
        </>
    )
}

export default HomePage