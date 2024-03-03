import React, { useEffect, useState } from "react";
import { exitFromPorfile, getUser, updateUserAsync } from "../../services/usersService";
import ImageComponent from "../ImageComponent";
import ModalButton from "../ModalButton";
import UserProfileCreation from "./UserProfileCreation";
import { PostsByUser } from "../posts/Post";

const UserProfile = () => {
    const [user, setUser] = useState({
        id: 0,
        name: '',
        password: '',
        email: '',
        description: '',
        photo: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data);
        };
        fetchUser();
    }, []);

    const updateUser = (newUser) => {
        setUser(newUser);
        updateUserAsync(newUser);
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div className="image-box" style={{ width: '50%' }}>
                    <ImageComponent base64String={user.photo} />
                </div>

                <div className="user-data" style={{ margin: '2% 10%' }}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Description: {user.description}</p>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <ModalButton
                            modalContent={<UserProfileCreation user={user} setAction={updateUser} />}
                            title={"Редактирование профиля"}
                            btnName={"Edit"}></ModalButton>
                        <button type="button" className="btn btn-secondary" onClick={exitFromPorfile}> Exit </button>
                    </div>

                </div>

            </div>
            <div>
                <PostsByUser userId={user.id} />
            </div>
        </div >
    );
};

export default UserProfile;