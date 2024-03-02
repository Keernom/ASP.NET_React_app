import React, { useState } from "react";
import ImageComponent from "../ImageComponent";
import ImageUploader from "../ImageUploader";

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
            photo: userPhoto
        }
        setAction(newUser);
    };

    const image = userPhotoStr ? <img src={userPhotoStr} alt="Image" /> : <ImageComponent base64String={user.photo} />

    return (
        <div style={{ display: "flex", flexDirection: "column", }}>
            <h2>User Profile</h2>
            <p>Name</p>
            <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
            <p>Password</p>
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            <p>Email</p>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <p>Description</p>
            <textarea onChange={e => setDescription(e.target.value)} value={userDescription} />
            <p>Photo</p>
            {image}
            <ImageUploader byteImageAction={(str, bytes) => { setPhoto(bytes); setPhotoSrt(str); }}></ImageUploader>

            <button onClick={endCreate}>Ok</button>
        </div>
    );
};

export default UserProfileCreation;