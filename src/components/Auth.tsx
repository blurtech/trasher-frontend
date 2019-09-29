import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Auth.module.scss';
import { IUser } from '../classes/models/IUser';
import UserStoreService from '../classes/services/UserStoreService';
import Cities from './Auth/Cities';

enum Form {
  Login = 'login',
  Register = 'register',
}

interface IProps {
  setAuth: () => void;
}

const Auth = (props: IProps) => {
  const [form, setForm] = React.useState<Form>(Form.Login);
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
      {form === 'register' ? (
        <Cities
          onChange={(item: any) =>{
              console.log(item)
              user
              ? setUser({
                  ...user,
                  address: {
                    city: item.value,
                  },
                })
              : setUser({
                  address: {
                    city: item.value,
                  },
                })}
          }
        />
      ) : (
        <></>
      )}
      <div className={styles.AuthButtons}>
        {form === 'login' ? (
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={() => {
              setMessage(undefined);
              user && user.username && user.password
                ? UserStoreService.authUser(user).then(result => {
                    setUser(result);
                    props.setAuth();
                  })
                : setMessage('Empty username or password');
            }}
          >
            Вход
          </Button>
        ) : (
          <Button className={styles.button} onClick={() => setForm(Form.Login)}>
            Вход
          </Button>
        )}
        {form === 'register' ? (
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={() => {
              setMessage(undefined);
              user && user.username && user.password
                ? UserStoreService.registerUser(user).then(result => {
                    setUser(result);
                    props.setAuth();
                  })
                : setMessage('Empty username or password');
            }}
          >
            Регистрация
          </Button>
        ) : (
          <Button
            className={styles.button}
            onClick={() => setForm(Form.Register)}
          >
            Регистрация
          </Button>
        )}
      </div>
    </div>
  );
};

export default Auth;
