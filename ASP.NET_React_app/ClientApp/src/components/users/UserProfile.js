import React, { useEffect, useState } from "react";
import { getUser, updateUserAsync } from "../../services/usersService";
import ImageComponent from "../ImageComponent";
import ModalButton from "../ModalButton";
import UserProfileCreation from "./UserProfileCreation";

const UserProfile = () => {
    const [user, setUser] = useState({
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
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Description: {user.description}</p>
            <ImageComponent base64String={user.photo} />
            <ModalButton modalContent={<UserProfileCreation user={user} setAction={updateUser} />} title={"Редактирование профиля"}></ModalButton>
        </div>
    );
};

export default UserProfile;