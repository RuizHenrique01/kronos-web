import { Link, useNavigate } from 'react-router-dom';
import loginSVG from '../../assets/login.svg';
import logo from '../../assets/logo_cronos.png';
import { Email, Lock } from '@mui/icons-material';
import styles from './login.module.css';
import { useState } from 'react';
import { IAuth } from '../../interfaces';
import { AuthenticateService } from '../../services/authenticate.service';
import { enqueueSnackbar } from 'notistack';
import { useSetSystemState, useSetUserState } from '../../store/hooks';
import { UserService } from '../../services/user.service';
import { Box, CircularProgress } from '@mui/material';

const Login = () => {

  const [user, setUser] = useState<IAuth>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setSystem = useSetSystemState();
  const setUserState = useSetUserState();

  const authenticateService = new AuthenticateService();
  const userService = new UserService();

  const navigate = useNavigate();

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, email: event.target.value });
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, password: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSystem({
      loadingSystem: true,
    });

    setIsLoading(true);

    authenticateService.authentication({
      email: user.email,
      password: user.password
    })
      .then(response => {
        authenticateService.setToken(response.data.token);

        userService.getUser()
          .then((user) => {
            console.log("USER", user)
            setUserState({
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              isAuthenticated: true,
              token: authenticateService.getToken()
            });

          })
          .catch(() => {
            enqueueSnackbar('Houve um error ao obter informações do usuário', {
              variant: 'error'
            });
          })
          .finally(() => {
            setTimeout(() => {
              setSystem({
                loadingSystem: false,
              })
            }, 1000)
          })

        navigate('/inicio');

      })
      .catch(() => {
        enqueueSnackbar('Email ou senha inválidos', {
          variant: 'error'
        });
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className={styles.login__main}>
      <div className={styles.login__body}>
        <div className={styles.login__logo}>
          <img src={logo} alt="logoCronos" />
        </div>
        <div className={styles.login__image}>
          <img src={loginSVG} alt="Login SVG" />
        </div>
        <form className={styles.login__form} onSubmit={e => handleSubmit(e)}>

          <label htmlFor="email" className={styles.login__label}>Email
            <div className={styles.login__input}>
              <Email className={styles.login__icon} />
              <input type="email" name='email' id='email' placeholder='seuemail@email.com' required value={user.email} onChange={e => handleEmail(e)}/>
            </div>
          </label>

          <label htmlFor="password" className={styles.login__label}>Password
            <div className={styles.login__input}>
              <Lock className={styles.login__icon} />
              <input type="password" name="password" id="password" placeholder='Digite sua senha' required value={user.password} onChange={e => handlePassword(e)}/>
            </div>
          </label>

          <div className={styles.login__forgetPassword}>
            <Link to="/forgetpassword">Esqueceu sua senha?</Link>
          </div>

          <div>
            <button type='submit' className={styles.login__button}>
            {isLoading ? <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                background: 'transparent',
              }}>
                <CircularProgress size={24} sx={{
                  color: '#FFF',
                }} />
              </Box> : <span>Login</span>}
            </button>
          </div>

          <div className={styles.login__createAcount}>
            <Link to="/signup">Ainda não possui conta? Cadastre-se aqui!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;