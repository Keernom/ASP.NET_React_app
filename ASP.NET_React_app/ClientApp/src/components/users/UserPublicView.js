import React, { useEffect, useState } from "react";
import UserView from "./UserView";
import { useParams } from "react-router-dom";
import { getPublicUser } from "../../services/usersService";

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

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getPublicUser(userId);
            setUser(data);
        };
        fetchUser();
    }, []);

    return <UserView user={user} />
}

export default UserPublicView;