import React, { useState } from "react";
import ImageComponent from "../ImageComponent";
import ImageUploader from "../ImageUploader";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import style from './Posts.module.css';

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
        <div className={style.creationBox}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control type="text" autoFocus value={text} onChange={e => setText(e.target.value)} />
                </Form.Group>
                <Form.Group className={style.photoGroup}>
                    <Form.Label>Image</Form.Label>
                    {imageView}
                    <ImageUploader byteImageAction={(str, bytes) => { setImage(bytes); setImageStr(str); }} />
                </Form.Group>
            </Form>
            <Button className="mt-3" variant="primary" onClick={endCreate}> Ok </Button>
        </div>
    )
}

export default PostCreation;