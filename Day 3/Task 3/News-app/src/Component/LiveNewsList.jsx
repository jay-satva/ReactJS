import React from "react"
function LiveNewsList({ posts, loading, error, onRefresh }) {

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>
  return (
    <div>
      <button onClick={onRefresh}>Refresh</button>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px", border: '1px solid black' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default React.memo(LiveNewsList)
