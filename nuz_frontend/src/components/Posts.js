import Post from "./Post"


const Posts = ({ posts, user, setPosts, setUser }) => {
    
    return (
        <>
            { posts.map(post => <Post post={post} key={post.id} user={user} posts={posts} setPosts={setPosts} setUser={setUser}/>) } 
        </>
    )
}

export default Posts