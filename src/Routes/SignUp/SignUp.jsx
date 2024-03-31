import style from './SignUp.module.css'
import piggy_img from '../../assets/piggy_bag.png'

function SignUp (){

    return(
    <div className={style.body}>
        <div className={style.sign_up}>
            <form action="">

            </form>
            <img src={piggy_img} alt="piggy bag image" />
        </div>
    </div>
    )
}

export default SignUp