import Post from "./Post"


const Posts = ({ posts, user, setPosts }) => {
    
    return (
        <ul>
            { posts.map(post => <Post post={post} key={post.id} user={user} posts={posts} setPosts={setPosts}/>) }
        </ul>
    )
}

export default Posts