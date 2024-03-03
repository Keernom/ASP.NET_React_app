import React, { useState } from "react";
import ImageComponent from "../ImageComponent";
import ImageUploader from "../ImageUploader";

const PostCreation = ({ id, oldText, oldImage, setAction }) => {
    const [text, setText] = useState(oldText);
    const [image, setImage] = useState(oldImage);
    const [imageStr, setImageStr] = useState('');

    const endCreate = () => {
        const newPost = {
            id: id,
            text: text,
            image: image
        }

        setAction(newPost);
    }

    const imageView = imageStr ? <img src={imageStr} alt="Image" /> : <ImageComponent base64String={oldImage} />

    return (
        <div style={{ display: "flex", flexDirection: "column", }}>
            <p>Text</p>
            <textarea value={text} onChange={e => setText(e.target.value)} />
            <p>Image</p>
            {imageView}
            <ImageUploader byteImageAction={(str, bytes) => { setImage(bytes); setImageStr(str); }}></ImageUploader>
            <button onClick={endCreate}>Ok</button>
        </div>
    )
}

export default PostCreation;