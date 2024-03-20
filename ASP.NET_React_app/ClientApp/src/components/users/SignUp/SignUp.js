import { LOGIN_URL } from "../../../services/commonService";
import { createUserAsync } from "../../../services/usersService";
import UserProfileCreation from "../UserProfileCreation/UserProfileCreation";
import style from './SignUp.module.css'

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
        <>
            <h1 className={style.welcomeTitle}> Let's Sign Up Your Account! </h1>
            <div className={style.signupTile}>
                <UserProfileCreation setAction={signUpAction} user={userDefault} />
                <button className="btn btn-link" onClick={openLoginPage}> Login </button>
            </div>
        </>
    );
}

export default SignUp;