import { useEffect, useState } from "react";
import { getUsersByName, isUserSubscribed, subcribeToUser, unsubcribeFromUser } from "../../../services/usersService"
import ImageComponent from "../../ImageComponent";
import { LOGIN_URL, isUserOnline } from "../../../services/commonService";
import { Form } from "react-bootstrap";
import style from './SearchUser.module.css'
import { Button } from "react-bootstrap";


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
        <>
            <h1>User's Search</h1>
            <Form className={style.searchDiv}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control type="text" onChange={e => getUsers(e.target.value)} />
                </Form.Group>
            </Form>
            {users !== undefined ? users.map((u, key) => <ShortUserView user={u} key={key} />) : <div></div>}
        </>
    )
}

export default SearchUser;

const ShortUserView = ({ user }) => {

    const [showBtn, setShowBtn] = useState(true);

    const userClick = (userId) => {
        window.location.href = `/all/${userId}`;
    }

    const subscribe = () => {
        subcribeToUser(user.id);
        setShowBtn(false);
    }

    const unsubscribe = () => {
        unsubcribeFromUser(user.id);
        setShowBtn(false);
    }

    const subsBtn = user.isInSubs ?
        <Button variant="primary" className={style.subsBtn} onClick={unsubscribe}> Unsubscribe </Button> :
        <Button variant="primary" className={style.subsBtn} onClick={subscribe}> Subscribe </Button>

    return (
        <div className={style.user_short} >
            <div className={style.userDiv} onClick={() => userClick(user.id)}>
                <ImageComponent base64String={user.photo} styles={style.userPhoto} />
                <div className={style.user_short_data}>
                    <p className={style.user_short_title}>{user.name}</p>
                    <p>{user.description}</p>
                </div>
            </div>
            {showBtn ? subsBtn : <></>}
        </div>
    )
}