import ImageComponent from "../ImageComponent";
import { PostsByUser } from "../posts/Post";
import { createPost } from "../../services/postsService";
import { PROFILE_URL } from "../../services/commonService";
import ModalButton from "../ModalButton";
import PostCreation from "../posts/PostCreation";

const UserView = ({ user }) => {

    const addNewPost = async (post) => {
        await createPost(post);
        window.location.href = PROFILE_URL;
    }

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
                <ModalButton
                    modalContent={<PostCreation id={0} oldText={''} oldImage={''} setAction={addNewPost} />}
                    title={"New Post"}
                    btnName={"Add Post"} />
                <PostsByUser userId={user.id} />
            </div>
        </div >
    )
}

export default UserView;