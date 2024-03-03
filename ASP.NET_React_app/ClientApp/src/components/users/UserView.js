import ImageComponent from "../ImageComponent";
import { PostProfileView, PostsByUser, PostsForUser } from "../posts/Post";
import { createPost } from "../../services/postsService";
import { PROFILE_URL } from "../../services/commonService";
import ModalButton from "../ModalButton";
import PostCreation from "../posts/PostCreation";
import { subcribeToUser } from "../../services/usersService";

const UserView = ({ user, isProfile }) => {

    const addNewPost = async (post) => {
        await createPost(post);
        window.location.href = PROFILE_URL;
    }

    const subscribe = () => {
        subcribeToUser(user.id);
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
                {isProfile ?
                    <div>
                        <ModalButton
                            modalContent={<PostCreation id={0} oldText={''} oldImage={''} setAction={addNewPost} />}
                            title={"New Post"}
                            btnName={"Add Post"} />
                        <PostProfileView userId={user.id} />
                    </div> :
                    <div>
                        <button type="button" className="btn btn-info" onClick={subscribe}> Subscribe </button>
                        <PostsByUser userId={user.id} />
                    </div>}
            </div>
        </div >
    )
}

export default UserView;