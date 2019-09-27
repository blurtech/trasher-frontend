import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Auth.module.scss';
import { IUser } from '../classes/models/IUser';
import { register, auth } from '../classes/services/api/UserApi';

const Auth = () => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const handleChange = (event: any) => {
    user
      ? setUser({
          ...user,
          [event.target.name]: event.target.value,
        })
      : setUser({
          [event.target.name]: event.target.value,
        });
  };

  return (
    <div className={styles.AuthForm}>
      {message && <div className={styles.AuthMessage}>{message}</div>}
      <TextField
        name="username"
        label="Имя пользователя"
        className={styles.textField}
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Пароль"
        type="password"
        className={styles.textField}
        margin="normal"
        onChange={handleChange}
      />
      <div className={styles.AuthButtons}>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => {
            console.log(user);
            setMessage(undefined);
            user && user.username && user.password
              ? auth(user).then(result => console.log(result))
              : setMessage('Empty username or password');
          }}
        >
          Вход
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => {
            console.log(user);
            setMessage(undefined);
            user && user.username && user.password
              ? register(user).then(result => console.log(result))
              : setMessage('Empty username or password');
          }}
        >
          Регистрация
        </Button>
      </div>
    </div>
  );
};

export default Auth;
