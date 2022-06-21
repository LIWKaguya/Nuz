import Post from "./Post"


const Posts = ({ posts, user, setPosts }) => {
    
    return (
        <>
            { posts.map(post => <Post post={post} key={post.id} user={user} posts={posts} setPosts={setPosts}/>) } 
        </>
    )
}

export default Posts