import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import { PROFILE_URL, USERS_URL, sendRequestWithToken } from "../../services/commonService";
import { deletePost, getPostsByUserId, updatePost, getPosts } from "../../services/postsService";
import ModalButton from "../ModalButton";
import PostCreation from "../posts/PostCreation";


export const Post = ({ id, text, imageStr, date, updateAction }) => {

    const updatePostView = async (post) => {
        await updatePost(post);
        updateAction(id);
    }

    const deletePostView = async () => {
        await deletePost(id);
        updateAction(id);
    }

    return (
        <div className="post-item">
            <div className="post-actions">
                <ModalButton
                    modalContent={<PostCreation id={id} oldText={text} oldImage={imageStr} setAction={updatePostView} />}
                    title={"Edit Post"}
                    btnName={"Edit Post"} />
                <button type="button" className="btn btn-danger" onClick={deletePostView}> Delete Post </button>
            </div>
            <PostView date={date} text={text} imageStr={imageStr} />
        </div>
    )
}

const PostView = ({ date, text, imageStr }) => {
    return (
        <div className="post-item">
            <div className="img-box">
                <ImageComponent base64String={imageStr} />
            </div>
            <div>
                <p>{date}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

export const PostProfileView = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [updateUser, setupdateUser] = useState(0);

    const getAllPosts = async () => {
        if (userId === 0) return;
        const allPosts = await getPostsByUserId(userId);
        setPosts(allPosts)
    }

    useEffect(() => {
        getAllPosts();
    }, [userId, updateUser])

    return (
        <div className="post-item">
            {posts.map((el, key) => {
                return <Post key={key} id={el.id} text={el.text} imageStr={el.image} date={el.postDate} updateAction={setupdateUser} />
            })}
        </div>
    )
}

export const PostsByUser = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        if (userId === 0) return;
        const allPosts = await getPostsByUserId(userId);
        setPosts(allPosts)
    }

    useEffect(() => {
        getAllPosts();
    }, [userId])

    return (
        <div>
            {posts.map((el, key) => {
                return <PostView key={key} date={el.postDate} text={el.text} imageStr={el.image} />
            })}
        </div>
    )
}

export const PostsForUser = () => {
    const [posts, setPosts] = useState([]);
    const [updateUser, setupdateUser] = useState(0);

    const getAllPosts = async () => {
        const allPosts = await getPosts();
        setPosts(allPosts)
    }

    useEffect(() => {
        getAllPosts();
    }, [updateUser])

    return (
        <div>
            {posts.map((el, key) => {
                return <PostView key={key} date={el.postDate} text={el.text} imageStr={el.image} />
            })}
        </div>
    )
}