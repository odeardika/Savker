import style from './SignIn.module.css'
import piggy_img from '../../assets/piggy_bag.png'
import logo from '../../../public/logo.svg'

function SignIn (){

    return(
    <div className={style.body}>
        <div className={style.sign_in}>
            <form action="#" className={style.input_field}>
                <div className={style.logo}>
                    <img src={logo} alt="savker logo" className={style.logo_img} />
                    <p className={style.logo_text}>SAVKER</p>
                </div>
                <h1 className={style.heading}>Wellcome Back</h1>
                <p className={style.signup_href}>Don't have an account? <a href="./signup">sign up</a></p>
                <input type="text" placeholder='Username or Email' />
                <input type="password" placeholder='Password' />
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