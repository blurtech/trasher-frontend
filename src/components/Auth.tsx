import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Auth.module.scss';
import { IUser } from '../classes/models/IUser';

const Auth = () => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);

  const handleChange = (event: any) => {
      setUser({
          [event.target.name]: event.target.value
      });
  }

  return (
    <div className={styles.AuthForm}>
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
        <Button variant="contained" className={styles.button}>
          Вход
        </Button>
        <Button variant="contained" className={styles.button}>
          Регистрация
        </Button>
      </div>
    </div>
  );
};

export default Auth;
