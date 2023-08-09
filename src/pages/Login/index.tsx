import { Link } from 'react-router-dom';
import loginSVG from '../../assets/login.svg';
import logo from '../../assets/logo_cronos.png';
import { Email, Lock } from '@mui/icons-material';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login__main}>
      <div className={styles.login__body}>
        <div className={styles.login__body__logo}>
          <img src={logo} alt="logoCronos" />
        </div>
        <div className={styles.login__body__image}>
          <img src={loginSVG} alt="Login SVG" />
        </div>
        <form className={styles.login__body__form}>

          <label htmlFor="email" className={styles.login__body__form__label}>Email
            <div className={styles.login__body__form__input}>
              <Email className={styles.login__body__form__input__icon} />
              <input type="email" name='email' id='email' placeholder='seuemail@email.com' required />
            </div>
          </label>

          <label htmlFor="password" className={styles.login__body__form__label}>Password
            <div  className={styles.login__body__form__input}>
              <Lock className={styles.login__body__form__input__icon} />
              <input type="password" name="password" id="password" placeholder='Digite sua senha' required />
            </div>
          </label>

          <div className={styles.login__body__form__forgetPassword}>
            <Link to="/forgetpassword">Esqueceu sua senha?</Link>
          </div>

          <div>
            <button type='submit' className={styles.login__body__form__button}>
              <span>Login</span>
            </button>
          </div>

          <div className={styles.login__body__form__createAcount}>
            <Link to="/signup">Ainda não possui conta? Cadastre-se aqui!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;