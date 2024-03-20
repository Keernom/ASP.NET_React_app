import React, { useEffect, useState } from "react";
import { exitFromPorfile, getUser, updateUserAsync } from "../../../services/usersService";
import ModalButton from "../../ModalButton/ModalButton";
import UserProfileCreation from "../UserProfileCreation/UserProfileCreation";
import UserView from "../UserView/UserView";
import { Button, ButtonGroup } from "react-bootstrap";
import style from './UserProfile.module.css';


const UserProfile = () => {
    const [user, setUser] = useState({
        id: 0,
        name: '',
        password: '',
        email: '',
        description: '',
        photo: ''
    });

    const fetchUser = async () => {
        const data = await getUser();
        setUser(data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const updateUser = async (newUser) => {
        await updateUserAsync(newUser);
        setUser(newUser);
    }

    return (
        <div className={style.profile}>

            <div className={style.btns}>
                <ModalButton
                    modalContent={<UserProfileCreation user={user} setAction={updateUser} />}
                    title={"Profile Settings"}
                    btnName={"Edit"} />
                <Button variant="danger" className={style.btnExit} onClick={exitFromPorfile}>Exit</Button>
            </div>

            <UserView user={user} isProfile={true} />
        </div >
    );
};

export default UserProfile;