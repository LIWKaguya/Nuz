

const Posts = ({ posts, user }) => {

    const handleDelete = () => {
        
    }
    
    return (
        <ul>
            {
                posts.map(post => 
                    <li key={post.id}>
                        {post.content} by {post.user.username}
                        { user.username === post.user.username ? <button onClick={handleDelete}>Delete</button> : <></>}
                    </li>)
            }
            
        </ul>
    )
}

export default Posts