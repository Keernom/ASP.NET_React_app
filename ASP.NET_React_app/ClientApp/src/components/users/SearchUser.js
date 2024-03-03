import { useState } from "react";
import { getUsersByName } from "../../services/usersService"
import ImageComponent from "../ImageComponent";
import { LOGIN_URL, isUserOnline } from "../../services/commonService";


const SearchUser = () => {
    const [users, setUsers] = useState([]);

    if (!isUserOnline()) window.location.href = LOGIN_URL;

    const getUsers = async (username) => {
        try {
            const users = await getUsersByName(username);
            setUsers(users);
        }
        catch {
            return;
        }
    }

    return (
        <div>
            <input type="text" onChange={e => getUsers(e.target.value)} />
            {users !== undefined ? users.map(u => <ShortUserView user={u} />) : <div></div>}
        </div>
    )
}

export default SearchUser;

const ShortUserView = ({ user }) => {

    const userClick = (userId) => {
        window.location.href = `/all/${userId}`;
    }

    return (
        <div className="user-short" onClick={() => userClick(user.id)}>
            <div className="user-short-img">
                <ImageComponent base64String={user.photo} />
            </div>
            <div className="user-short-data">
                <p>{user.name}</p>
                <p>{user.description}</p>
            </div>
        </div>
    )
}