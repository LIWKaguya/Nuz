import { useState } from "react"

import postsService from '../services/posts'

const UploadSection = ({ setPosts, posts }) => {
    const [ content, setContent ] = useState('') 

    const handleUpload = async (event) => {
        event.preventDefault()
        const newPost = await postsService.upload({
            content
        })
        setPosts(posts.concat(newPost))
        setContent('')
    }

    return (
        <form onSubmit={handleUpload}>
            <div>
                <textarea value={content} onChange={({ target }) => setContent(target.value)} placeholder='What are you thinking today?' />
            </div>
            <button type='submit'>Post</button>
        </form>
    )
}

export default UploadSection

// The like function is still busted for some reason