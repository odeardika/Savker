import logo from '../../../public/logo.svg';
import style from './SavkerLogo.module.css';


const SavkerLogo = () => {
    return(
        <>
            <div className={style.logo}>
                <img src={logo} alt="savker logo" className={style.logo_img} />
                <p className={style.logo_text}>SAVKER</p>
            </div>
        </>
    );
}

export default SavkerLogo;