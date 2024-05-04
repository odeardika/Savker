import style from './SignIn.module.css';
import piggy_img from '../../assets/piggy_bag.png';
import logo from '../../../public/logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults;

function SignIn (){
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameOrEmailError, setUsernameOrEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUsernameOrEmailError(false);
        setPasswordError(false);
    }, [usernameOrEmail, password]);

    const handleUsernameOrEmail = event => setUsernameOrEmail(event.target.value);
    const handlePassword = event => setPassword(event.target.value);
    
    // handle error
    const handleMissingInformation = (message) => {
        if(!usernameOrEmail) setUsernameOrEmailError(true);
        if(!password) setPasswordError(true);
        return setErrorMessage(message);
    }
    const handleWrongPassword = (message) => {
        setPasswordError(true);
        return setErrorMessage(message);
    }
    const handleUserNotFound = (message) => {
        setUsernameOrEmailError(true);
        return setErrorMessage(message);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/login',{
            identifier : usernameOrEmail,
            password : password
        }).then(res => {
            if(res.data.data.user){
                sessionStorage.setItem('id', res.data.data.user.id);
                sessionStorage.setItem('username', res.data.data.user.username);
                sessionStorage.setItem('email', res.data.data.user.email);
                sessionStorage.setItem('balance', res.data.data.user.balance)

                return navigate('/homepage');
            }
        }).catch(err => {
            if(err.response.data.error === "Missing information"){
                return handleMissingInformation("This field still empty")
            }
            if(err.response.data.error === "Not Found"){
                let message = err.response.data.message.split(" ")[6]
                handleUserNotFound(`User not found. Please double-check your ${message} and try again.`)
            }
            if(err.response.data.error === "Unauthorized"){
                handleWrongPassword("The password was incorrect")
            }
            console.error(err.response.data.message);
        });
    }
    return(
    <div className={style.body}>
        <div className={style.sign_in}>
            <form onSubmit={handleSubmit} className={style.input_field}>
                <div className={style.logo}>
                    <img src={logo} alt="savker logo" className={style.logo_img} />
                    <p className={style.logo_text}>SAVKER</p>
                </div>
                <h1 className={style.heading}>Wellcome Back</h1>
                <p className={style.signup_href}>Don't have an account? <a href="./signup">sign up</a></p>
                <input type="text" placeholder='Username or Email' value={usernameOrEmail} onChange={handleUsernameOrEmail} className={(usernameOrEmailError)? style.input_error : ""}/>
                <p className={(usernameOrEmailError)? style.error_message : style.hide_massage}>{(!errorMessage)? "" : errorMessage}</p>

                <input type="password" placeholder='Password' value={password} onChange={handlePassword} className={(passwordError)? style.input_error : ""}/>
                <p className={(passwordError)? style.error_message : style.hide_massage}>{(!errorMessage)? "" : errorMessage}</p>

                <div className={style.button_div}>
                    <button>Sign in</button>
                </div>
            </form>
            <img src={piggy_img} alt="piggy bag image" className={style.piggy_img} />
        </div>
    </div>
    )
}

export default SignIn