import React, { useEffect, useState } from "react";
import UserView from "./UserView";
import { useParams } from "react-router-dom";
import { getPublicUser, subcribeToUser } from "../../services/usersService";

const UserPublicView = () => {
    const [user, setUser] = useState({
        id: 0,
        name: '',
        password: '',
        email: '',
        description: '',
        photo: ''
    });

    const params = useParams();
    const userId = params.userId;

    const subscribeClick = () => {
        subcribeToUser(userId)
    }

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getPublicUser(userId);
            setUser(data);
        };
        fetchUser();
    }, []);

    return <UserView user={user} isProfile={false} />
}

export default UserPublicView;