import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from './SignUp.module.css';
import piggy_img from '../../assets/piggy_bag.png';
import logo from '../../assets/logo.svg';
import axios from 'axios';
axios.defaults;

function SignUp (){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        setEmailError(false);
        setUsernameError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
    }, [email, username, password,confirmPassword])

    const handleUsername = (event) => setUsername(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);

    // handle error
    const handleEmailOrUsernameExist = (message) => {
        setEmailError(true);
        setUsernameError(true);
        return setErrorMessage(message);
    }
    const handleInvalidEmail = message => {
        setEmailError(true);
        return setErrorMessage(message);
    }
    const handlePasswordDontMatch = (message) => {
        setPasswordError(true);
        setConfirmPasswordError(true);
        return setErrorMessage(message);
    }
    const handleMissingData = (message) => {
        if(!username) setUsernameError(true);
        if(!email) setEmailError(true);
        if(!password) setPasswordError(true);
        if(!confirmPassword) setConfirmPasswordError(true);
        return setErrorMessage(message);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/regis', {
            username : username,
            email : email,
            password : password,
            confirmPassword : confirmPassword
        }).then(res => {
            if(res.data.user){
                sessionStorage.setItem('id', res.data.user.id);
                sessionStorage.setItem('username', res.data.user.username);
                sessionStorage.setItem('email', res.data.user.email);
                sessionStorage.setItem('balance', res.data.user.balance)

                return navigate('/homepage');
            }
        }).catch(err => {
            if(err.response.data.error.error === "Email is not valid"){
                return handleInvalidEmail("Email is not valid");
            }
            if(err.response.data.error.error === "Email or username already exists"){
                return handleEmailOrUsernameExist("Email or username already exists");
            }
            if( err.response.data.error === "Passwords do not match"){
                return handlePasswordDontMatch("The password and confirm password doesn't match.")
            }if(err.response.data.error === "Missing information"){
                return handleMissingData("This field still empty", err.response.data.missing_data);
            }
        });

        

    }
    return(
    <div className={style.body}>
        <div className={style.sign_up}>
            <form className={style.input_field} onSubmit={handleSubmit}>
                <div className={style.logo}>
                    <img src={logo} className='logo_img' alt="savker logo" />
                    <p className={style.logo_text}>SAVKER</p>
                </div>
                <h3>Get Started</h3>
                <p className={style.text_signin}>Already have an account? <a href="./"><span>sign in</span></a></p>
                <input value={username} onChange={handleUsername} className={(usernameError)? style.input_error : ""} type="text" placeholder='Username' />
                <p className={(usernameError)? style.error_message : style.hide_massage}>{(!errorMessage)? "" : errorMessage}</p>

                <input value={email} onChange={handleEmail} className={(emailError)? style.input_error : ""} type="email" placeholder='Email'/>
                <p className={(emailError)? style.error_message : style.hide_massage}>{(!errorMessage)? "" : errorMessage}</p>

                <input value={password} onChange={handlePassword} className={(passwordError)? style.input_error : ""} type="password" placeholder='Password' />
                <p className={(passwordError)? style.error_message : style.hide_massage}>{(!errorMessage)? "" : errorMessage}</p>
                
                <input value={confirmPassword} onChange={handleConfirmPassword} className={(confirmPasswordError)? style.input_error : ""} type="password" placeholder='Confirm Password'/>
                <p className={(confirmPasswordError)? style.error_message : style.hide_massage}>{(!errorMessage)? "" : errorMessage}</p>

                <div className={style.button_div}>
                    <button className={(email && username && password && confirmPassword)? style.active_button : style.normal_button }>Sign up</button>
                </div>
            </form>
            <img className={style.piggy_img} src={piggy_img} alt="piggy bag image" />
        </div>
    </div>
    )
}

export default SignUp