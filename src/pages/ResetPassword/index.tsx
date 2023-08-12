import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import styles from './resetPassword.module.css';
import { UserService } from '../../services/user.service';

function ResetPassword() {

  const [email, setEmail] = useState('');

  const userService = new UserService();

  const handleSubimt = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    userService.sendResetPassword(email)
      .then(() => {
        enqueueSnackbar('Email enviado com sucesso!', { variant: 'success' });

        setEmail('');
      }).catch(() => {
        enqueueSnackbar('Usuário não encontrado!', { variant: 'error' });
      });
  }

  return (
    <div className={styles.page_reset_senha}>
      <form className={styles.container_reset_senha}
        onSubmit={(e) => handleSubimt(e)}
      >
        <h1 className={styles.titulo_reset_senha}>Recuperar sua senha</h1>
        <p className={styles.paragraph_reset_senha}>Esqueceu seua senha? Digite seu e-mail que enviaremos um link para definir uma nova senha</p>
        <input className={styles.input_email} type="text" placeholder='Digite seu e-mail'
          value={email} onChange={e => setEmail(e.target.value)}
        />

        <button type="submit" className={styles.botao_enviar_senha}>Recuperar</button>
      </form>
    </div>
  )
}
export default ResetPassword;