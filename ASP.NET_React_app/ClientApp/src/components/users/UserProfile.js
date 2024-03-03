import React, { useEffect, useState } from "react";
import { exitFromPorfile, getUser, updateUserAsync } from "../../services/usersService";
import ImageComponent from "../ImageComponent";
import ModalButton from "../ModalButton";
import UserProfileCreation from "./UserProfileCreation";
import { PostsByUser } from "../posts/Post";
import UserView from "./UserView";

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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <ModalButton
                    modalContent={<UserProfileCreation user={user} setAction={updateUser} />}
                    title={"Редактирование профиля"}
                    btnName={"Edit"}></ModalButton>
                <button type="button" className="btn btn-secondary" onClick={exitFromPorfile}> Exit </button>
            </div>
            <UserView user={user} />
            <h2>User Profile</h2>
        </div >
    );
};

export default UserProfile;