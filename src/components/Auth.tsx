import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles.AuthForm}>
      <TextField
        id="username"
        label="Login"
        className={styles.textField}
        margin="normal"
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        className={classes.textField}
        margin="normal"
      />
    </div>
  );
};

export default Auth;
