import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles.AuthForm}>
      <TextField
        id="login"
        label="Login"
        className={styles.textField}
        margin="normal"
      />
    </div>
  );
};

export default Auth;
