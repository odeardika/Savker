import style from './SignUp.module.css'
import piggy_img from '../../assets/piggy_bag.png'
import logo from '../../assets/logo.svg'

function SignUp (){

    return(
    <div className={style.body}>
        <div className={style.sign_up}>
            <form className={style.input_field} action="#" method='post'>
                <div className={style.logo}>
                    <img src={logo} className='logo_img' alt="savker logo" />
                    <p className={style.logo_text}>SAVKER</p>
                </div>
                <h3>Get Started</h3>
                <p className={style.text_signin}>Already have an account? <a href="./"><span>sign in</span></a></p>
                <input type="text" placeholder='Username' required />
                <input type="email" placeholder='Email' required/>
                <input type="password" placeholder='Password' required/>
                <input type="password" placeholder='Confirm Password' required/>
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