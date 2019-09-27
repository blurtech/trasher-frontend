import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }),
);

const Auth = () => {
  const classes = useStyles();

  return (
    <div className="Auth-form">
      <TextField
        id="login"
        label="Login"
        className={classes.textField}
        margin="normal"
      />
    </div>
  );
};

export default Auth;
