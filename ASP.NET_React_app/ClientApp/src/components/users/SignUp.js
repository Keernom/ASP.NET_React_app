import { LOGIN_URL } from "../../services/commonService";
import { createUserAsync } from "../../services/usersService";
import UserProfileCreation from "./UserProfileCreation";


const SignUp = () => {

    const userDefault = {
        id: 0,
        name: '',
        password: '',
        email: '',
        description: '',
        photo: ''
    }

    const signUpAction = (newUser) => {
        createUserAsync(newUser);
    }

    const openLoginPage = () => {
        window.location.href = LOGIN_URL;
    }

    return (
        <div>
            <UserProfileCreation setAction={signUpAction} user={userDefault} />
            <button className="btn btn-link" onClick={openLoginPage}> Login </button>

        </div>
    );
}

export default SignUp;