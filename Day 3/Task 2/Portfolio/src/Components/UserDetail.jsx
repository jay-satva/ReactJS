import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"

function UserDetail() {
    const { id } = useParams();
    
    
    const location = useLocation()
    const user = location.state
  return (
    <>
      <h1>User Details Section</h1>
      <h2>User ID: {id}</h2>
      <h2>Name: {user?.name}</h2>
      <h2>Email: {user?.email}</h2>
    </>
  )
}

export default UserDetail;
