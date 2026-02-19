import { useParams } from "react-router-dom"
function UserDetail() {
  const { id } = useParams();

  return (
    <>
      <h1>User Details Section</h1>
      <h2>User ID: {id}</h2>
    </>
  )
}

export default UserDetail;
