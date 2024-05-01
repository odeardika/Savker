import { useState } from 'react';
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
    const navigate = useNavigate();

    const handleUsername = (event) => setUsername(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);
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
                alert("Email not valid")
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
                <input value={username} onChange={handleUsername} type="text" placeholder='Username' />
                <input value={email} onChange={handleEmail} className={(emailError)? style.email_error : ""} type="email" placeholder='Email'/>
                <p className={(emailError)? style.error_message : style.hide_massage}>Email is not valid</p>
                <input value={password} onChange={handlePassword} type="password" placeholder='Password' />
                <input value={confirmPassword} onChange={handleConfirmPassword} type="password" placeholder='Confirm Password'/>
                <div className={style.button_div}>
                    <button>Sign up</button>
                </div>
            </form>
            <img className={style.piggy_img} src={piggy_img} alt="piggy bag image" />
        </div>
    </div>
    )
}

export default SignUp