import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Auth.module.scss';

const Auth = () => {
  const handleSubmit = () => {
    return 0;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.AuthForm}>
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
        className={styles.textField}
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        Authorize
      </Button>
    </form>
  );
};

export default Auth;
