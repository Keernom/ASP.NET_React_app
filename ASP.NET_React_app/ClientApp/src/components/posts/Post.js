import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import { PROFILE_URL, USERS_URL, sendRequestWithToken } from "../../services/commonService";
import { deletePost, getPostsByUserId, updatePost, getPosts } from "../../services/postsService";
import ModalButton from "../ModalButton/ModalButton";
import PostCreation from "../posts/PostCreation";
import style from './Posts.module.css';


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
        <div className={style.post}>
            <PostView date={date} text={text} imageStr={imageStr} />
            <div className={style.postActions}>
                <ModalButton
                    modalContent={<PostCreation id={id} oldText={text} oldImage={imageStr} setAction={updatePostView} />}
                    title={"Edit Post"}
                    btnName={"Edit Post"} />
                <button type="button" className="btn btn-danger" onClick={deletePostView}> Delete Post </button>
            </div>
        </div>
    )
}

const PostView = ({ date, text, imageStr }) => {

    const parsedDate = new Date(date)
    const viewDate = `${parsedDate.toDateString()}, ${parsedDate.getHours()}:${parsedDate.getMinutes()} `

    return (
        <div className={style.postView}>
            <p className={style.postDate} >{viewDate}</p>
            <div className={style.imageBox}>
                <ImageComponent styles={style.postImage} base64String={imageStr} />
            </div>
            <div className={style.postText}>
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
        <>
            {posts.map((el, key) => {
                return (
                    <div className={style.post}>
                        <Post key={key} id={el.id} date={el.postDate} text={el.text} imageStr={el.image} updateAction={setupdateUser} />
                    </div>
                )
            })}
        </>
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
        <>
            {posts.map((el, key) => {
                return (
                    <div className={style.post}>
                        <PostView key={key} date={el.postDate} text={el.text} imageStr={el.image} />
                    </div>
                )
            })}
        </>
    )
}

export const PostsForUser = () => {
    const [posts, setPosts] = useState([]);
    const [updateUser, setupdateUser] = useState(0);

    const getAllPosts = async () => {
        const allPosts = await getPosts();
        console.log(allPosts)
        setPosts(allPosts)
    }

    useEffect(() => {
        getAllPosts();
    }, [updateUser])

    return (
        <>
            <h1>Posts Special For You</h1>
            {posts.map((el, key) => {
                return (
                    <>
                        <div className={style.author}>
                            <p className={style.authorLabel}>{el.authorName}</p>
                        </div>

                        <div className={style.post}>
                            <PostView key={key} date={el.postDate} text={el.text} imageStr={el.image} />
                        </div>
                    </>
                )
            })}
        </>
    )
}