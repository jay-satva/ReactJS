import { useState, useEffect } from "react";
import LiveNewsList from "./LiveNewsList";

function FetchData() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("https://jsonplaceholder.typicode.com/posts")

      if (!response.ok) throw new Error("Failed to fetch")

      const data = await response.json()
      setPosts(data)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <LiveNewsList posts={posts} loading={loading} error={error} onRefresh={fetchPosts}/>
  )
}

export default FetchData
