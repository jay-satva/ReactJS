import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  data: [],
  loading: false,
  error: null,
  query: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload }

    case "FETCH_START":
      return { ...state, loading: true, error: null }

    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload }

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.query) return

    const fetchUsers = async () => {
      dispatch({ type: "FETCH_START" })

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${state.query}`)

        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()

        dispatch({ type: "FETCH_SUCCESS", payload: data })

      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    fetchUsers()
  }, [state.query])

  return (
    <div style={{ padding: "20px" }}>
      <h2>Global User Search</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={state.query}
        onChange={(e) =>
          dispatch({ type: "SET_QUERY", payload: e.target.value })
        }
      />

      {state.loading && <p>Loading...</p>}
      {state.error && (
        <p style={{ color: "red" }}>
          Error: {state.error}
        </p>
      )}

      {state.data.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/user/${user.id}`)}
        >
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default Home;
