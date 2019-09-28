import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Auth.module.scss';
import { IUser } from '../classes/models/IUser';
import { register, auth } from '../classes/services/api/UserApi';
import { appUpdateState } from '../store';
import { setUserLocal } from '../classes/helpers/StorageHelper';

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
        <>
          <TextField
            name="city"
            label="Город"
            className={styles.textField}
            margin="normal"
            onChange={event =>
              user
                ? setUser(
                    Object.assign(user, {
                      address: {
                        [event.target.name]: event.target.value,
                      },
                    })
                  )
                : setUser({
                    address: {
                      [event.target.name]: event.target.value,
                    },
                  })
            }
          />
        </>
      ) : (
        <></>
      )}
      <div className={styles.AuthButtons}>
        {form === 'login' ? (
          <Button
            variant="contained"
            className={styles.button}
            onClick={() => {
              setMessage(undefined);
              user && user.username && user.password
                ? auth(user).then(result => {
                    const userResult = {
                      ...result.data.user,
                      token: result.data.token,
                    };
                    setUser(userResult);
                    setUserLocal(JSON.stringify(userResult));
                    appUpdateState(s => {
                      s.currentUser = userResult;
                    });
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
            className={styles.button}
            onClick={() => {
              setMessage(undefined);
              user && user.username && user.password
                ? register(user).then(result => {
                    const userResult = {
                      ...result.data.user,
                      token: result.data.token,
                    };
                    setUser(userResult);
                    setUserLocal(JSON.stringify(userResult));
                    appUpdateState(s => {
                      s.currentUser = userResult;
                    });
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
