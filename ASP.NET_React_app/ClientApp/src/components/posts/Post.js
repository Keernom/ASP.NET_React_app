import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import { USERS_URL, sendRequestWithToken } from "../../services/commonService";
import { getPostsByUserId } from "../../services/postsService";


export const Post = ({ text, imageStr, date }) => {


    return (
        <div>
            <div className="post-item">
                <p>{date}</p>
                <p>{text}</p>
            </div>
            <ImageComponent base64String={imageStr} />
        </div>
    );
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
                return <Post key={key} text={el.text} imageStr={el.image} date={el.postDate} />
            })}
        </div>
    )
}