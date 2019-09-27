import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles.AuthForm}>
      <TextField
        id="username"
        label="Логин"
        className={styles.textField}
        margin="normal"
      />
      <TextField
        id="password"
        label="Пароль"
        type="password"
        className={styles.textField}
        margin="normal"
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
