import postsService from '../services/posts'

const Post = ({ post, user, posts, setPosts }) => {
    
    const handleDelete = async () => {
        if(window.confirm('Do you want to delete this post ?'))
        {
            await postsService.terminatePost({
                id: post.id
            })
            setPosts(posts.filter(p => p.id !== post.id))
        }
    }
    
    return (
        <>
            <li>{post.content} by {post.user.username}</li>
            {user.username === post.user.username ? <button onClick={handleDelete}>Delete</button> : <></>}
        </>
    )
}

export default Post 