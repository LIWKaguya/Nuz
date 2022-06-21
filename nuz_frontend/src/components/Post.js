import postsService from '../services/posts'

const Post = ({ post, user, posts, setPosts }) => {
    
    const postStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleDelete = async () => {
        if(window.confirm('Do you want to delete this post ?'))
        {
            await postsService.terminatePost({
                id: post.id
            })
            setPosts(posts.filter(p => p.id !== post.id))
        }
    }

    const handleLike = async () => {
        const likedPost = await postsService.likePost({
            id: post.id
        })
        setPosts(posts.map(p => p.id === likedPost ? likedPost : p))
    }
    
    return (
        <div style={postStyle}>
            <div>
                {post.content} by {post.user.username}
            </div>
            <div>
                Likes: {post.likedUsers.length} <button onClick={handleLike}>Like</button>
            </div>
            {user.username === post.user.username ? <button onClick={handleDelete}>Delete</button> : <></>}
        </div>
    )
}

export default Post 