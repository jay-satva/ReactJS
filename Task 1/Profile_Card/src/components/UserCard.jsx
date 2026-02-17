import './UserCard.css'
import image from '../assets/user1.jpg'
function UserCard({name, role, isAvailable}){
    return (
        <div className="card">
            <img src={image} alt="" />
            <div className="container">
                <h2>{name}</h2>
                <h3>{role}</h3>
                <span className={`status-dot ${isAvailable ? 'green' : 'red'}`}></span>
                {isAvailable ? " Available" : " Not Available"}
            </div>
        </div>
    )
}
export default UserCard