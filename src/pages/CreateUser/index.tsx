import { AccountCircle, Email, Lock } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import classNames from 'classnames';
import styles from './createUser.module.css'
import { useState } from 'react';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useSetSystemState, useSetUserState } from '../../store/hooks';
import InputError from '../../components/InputError';

const CreateUser = () => {

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [category, setCategory] = useState<string>('school');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const authenticateService = new AuthenticateService();
    const userService = new UserService();

    const [isLoading, setIsLoading] = useState(false);

    const emailRegex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
    const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/);

    const setSystem = useSetSystemState();
    const setUserState = useSetUserState();

    const navigate = useNavigate();

    const handleSubimit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmit(true);
        setIsLoading(true);

        authenticateService.createUser({
            name,
            lastName,
            email,
            password,
            phone: "99999999999"
        }).then(response => {
            authenticateService.setToken(response.data.token);
            setSystem({
                loadingSystem: true
            });

            userService.getUser()
                .then((user) => {

                    console.log(user);

                    setUserState({
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        isAuthenticated: true,
                        token: authenticateService.getToken()
                    });

                    setSystem({
                        loadingSystem: false
                    });

                })
                .catch(() => {
                    localStorage.clear();
                    navigate('/auth');
                    enqueueSnackbar('Houve um error ao obter informações do usuário', {
                        variant: 'error'
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });


            navigate('/projetos/primeiro');
        }).catch(() => {
            enqueueSnackbar('Falha ao cadastrar usuário.', {
                variant: 'error'
            })
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (<div className={styles.background_signup}>
        <form onSubmit={(e) => handleSubimit(e)}>
            <legend className={styles.signup_form_title}>CADASTRE-SE AQUI</legend>
            {/* Input Nome */}

            <div className={classNames({
                [styles.background_signup_container]: true,
                [styles.background_signup_container_error]: (isSubmit && !name)
            })}>
                <AccountCircle className={styles.background_signup_icon} />
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='name' className={styles.background_signup_input} placeholder='Nome' />
            </div>
            {(isSubmit && !name) && <div className={styles.input_error}>
                <InputError>Preencha o campo Nome!</InputError>
            </div>}
            {/* Input SobreNome */}
            <div className={classNames({
                [styles.background_signup_container]: true,
                [styles.background_signup_container_error]: (isSubmit && !lastName)
            })}>
                <AccountCircle className={styles.background_signup_icon} />
                <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} name='lastName' className={styles.background_signup_input} placeholder='Sobrenome' />
            </div>
            {(isSubmit && !lastName) && <div className={styles.input_error}>
                <InputError>Preencha o campo Sobrenome!</InputError>
            </div>}

            {/* Input Email */}
            <div className={classNames({
                [styles.background_signup_container]: true,
                [styles.background_signup_container_error]: (isSubmit && !email) || (isSubmit && !emailRegex.test(email))
            })}>
                <Email className={styles.background_signup_icon} />
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' className={styles.background_signup_input} placeholder='Email' />
            </div>
            {(isSubmit && !email) && <div className={
                classNames({
                    [styles.input_error]: true,
                    [styles.input_error_first]: true
                })}>
                <InputError>Preencha o campo Email!</InputError>
            </div>}
            {(isSubmit && !emailRegex.test(email)) && <div className={styles.input_error}>
                <InputError>Insira um email válido!</InputError>
            </div>}

            {/* Input Password */}
            <div className={classNames({
                [styles.background_signup_container]: true,
                [styles.background_signup_container_error]: (isSubmit && !password) || (isSubmit && !passwordRegex.test(password))
            })}>
                <Lock className={styles.background_signup_icon} />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name="password" className={styles.background_signup_input} placeholder='Password' />
            </div>
            {(isSubmit && !password) && <div className={
                classNames({
                    [styles.input_error]: true,
                    [styles.input_error_first]: true
                })}>
                <InputError>Preencha o campo Senha!</InputError>
            </div>}
            {(isSubmit && !passwordRegex.test(password)) && <div className={styles.input_error}>
                <InputError>A senha deve ter no mínimo 6 caracteres, letras maiúsculas, letras minúsculas, numerais e caracteres especiais!</InputError>
            </div>}

            {/* Input Data Nascimento */}
            <label className={styles.background_signup_label}>Data de nascimento:</label>
            <div className={styles.background_signup_container}>
                <input
                    type='date'
                    value={date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)}
                    onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        newDate.setDate(Number(e.target.value.slice(-2)));
                        setDate(newDate);
                    }}
                    name="birthday" className={styles.background_signup_input} placeholder='25/05/2023' />
            </div>

            {/* Input Categoria */}
            <label className={styles.background_signup_label}>Categoria:</label>
            <div className={styles.background_signup_group_radio}>
                <div className={styles.background_signup_container_radio}>
                    <label className={styles.background_signup_label_radio} htmlFor="school">
                        Escola
                    </label>
                    <input type="radio" id="school" name="category" className={styles.background_signup_radio} onChange={() => setCategory('school')} checked={category === 'school'} />
                </div>

                <div className={styles.background_signup_container_radio}>
                    <label className={styles.background_signup_label_radio} htmlFor="company">
                        Empresa
                    </label>
                    <input type="radio" id="company" name="category" className={styles.background_signup_radio} onChange={() => setCategory('company')} />
                </div>

                <div className={styles.background_signup_container_radio}>
                    <label className={styles.background_signup_label_radio} htmlFor="other">
                        Outro
                    </label>
                    <input type="radio" name="category" id="other" className={styles.background_signup_radio} onChange={() => setCategory('other')} />
                </div>
            </div>

            <span className={styles.background_signup_span}>
                As pessoas que usam nosso serviço podem ter carregado suas informações de contato no Medium. <a className={styles.background_signup_span_link} href='#'>Saiba mais.</a>
            </span>
            <span className={styles.background_signup_span}>
                Ao clicar em Cadastre-se, você concorda com nossos <a className={styles.background_signup_span_link} href='#'>Termos, Política de Privacidade e Política de Cookies.</a> Você poderá receber notificações por SMS e cancelar isso quando quiser.
            </span>

            <Button disabled={isLoading} type='submit' sx={{
                color: 'white',
                borderColor: 'white',
                margin: 2,
                ":hover": {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.2)'
                }
            }} variant="outlined">
                {
                    isLoading ?
                        <Box sx={{
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
                        </Box>
                        : <span>Cadastre-se</span>
                }
            </Button>
        </form>
    </div>)
}

export default CreateUser;