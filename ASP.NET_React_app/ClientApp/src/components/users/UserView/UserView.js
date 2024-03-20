import ImageComponent from "../../ImageComponent";
import { PostProfileView, PostsByUser, PostsForUser } from "../../posts/Post";
import { createPost } from "../../../services/postsService";
import { PROFILE_URL } from "../../../services/commonService";
import ModalButton from "../../ModalButton/ModalButton";
import PostCreation from "../../posts/PostCreation";
import { isUserSubscribed, subcribeToUser, unsubcribeFromUser } from "../../../services/usersService";
import style from './UserView.module.css'
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const UserView = ({ user, isProfile }) => {

    const addNewPost = async (post) => {
        await createPost(post);
        window.location.href = PROFILE_URL;
    }

    return (
        <div>

            <div className={style.userPanel}>

                <ImageComponent styles={style.userPhoto} base64String={user.photo} />

                <div className={style.userData}>
                    <h2 className={style.userTitle}>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Description: {user.description}</p>
                </div>

            </div>

            {isProfile ?
                <div className={style.userActions}>
                    <ModalButton
                        modalContent={<PostCreation id={0} oldText={''} oldImage={''} setAction={addNewPost} />}
                        title={"New Post"}
                        btnName={"Add Post"} />
                </div> : <></>}
            <div>
                {isProfile ? <PostProfileView userId={user.id} /> : <PostsByUser userId={user.id} />}
            </div>
        </div >
    )
}

export default UserView;