import React, { useState } from "react";
import ImageComponent from "../../ImageComponent";
import ImageUploader from "../../ImageUploader";
import style from './UserProifleCreation.module.css';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const UserProfileCreation = ({ user, setAction }) => {
    const [username, setUserName] = useState(user.name);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [userDescription, setDescription] = useState(user.description);
    const [userPhoto, setPhoto] = useState(user.photo);
    const [userPhotoStr, setPhotoSrt] = useState('');

    const endCreate = () => {
        if (password == undefined) return;

        const newUser = {
            name: username,
            password: password,
            email: email,
            description: userDescription,
            photo: typeof (userPhoto) == "string" ? '' : userPhoto
        }

        setAction(newUser);
    };

    const image = userPhotoStr ?
        <img src={userPhotoStr} alt="Image" className={style.image} /> :
        <ImageComponent base64String={userPhoto} styles={style.image} />

    return (
        <>
            <div className={style.creationBox}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" autoFocus value={username} onChange={e => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={userDescription} onChange={e => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className={style.photoGroup}>
                        <Form.Label>Photo</Form.Label>
                        {image}
                        <ImageUploader byteImageAction={(str, bytes) => { setPhoto(bytes); setPhotoSrt(str); }} />
                    </Form.Group>
                </Form>
                <Button className="mt-3" variant="primary" onClick={endCreate}> Ok </Button>
            </div>
        </>
    );
};

export default UserProfileCreation;