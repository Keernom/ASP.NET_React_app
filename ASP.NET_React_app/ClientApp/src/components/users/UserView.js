import ImageComponent from "../ImageComponent";
import { PostsByUser } from "../posts/Post";

const UserView = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div className="image-box" style={{ width: '50%' }}>
                    <ImageComponent base64String={user.photo} />
                </div>

                <div className="user-data" style={{ margin: '2% 10%' }}>
                    <p>Email: {user.email}</p>
                    <p>Description: {user.description}</p>
                </div>

            </div>
            <div>
                <PostsByUser userId={user.id} />
            </div>
        </div >
    )
}

export default UserView;