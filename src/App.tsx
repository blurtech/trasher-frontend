import React, { useState } from 'react';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel/AdminPanel';
import styles from './App.module.scss';
import { connect } from 'react-redux';
import { IAppState } from './store/state';
import { IUser } from './classes/models/IUser';
import { getUser } from './classes/helpers/StorageHelper';

interface IProps {
  currentUser: IUser;
}

const App = (props: IProps) => {
  const [user, setUser] = useState<IUser | undefined>(getUser().length > 0 ? JSON.parse(getUser()) : undefined);

  React.useEffect(() => {
    if (getUser().length > 0) {
      setUser(JSON.parse(getUser()) )
    } else {
      setUser(props.currentUser)
    }
  }, [props.currentUser]);

  return (
    <>
      {user ? (
          <AdminPanel currentUser={user} />
      ) : (
        <div className={styles.App}>
          <Auth />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IAppState): IProps => ({
  currentUser: state.app.currentUser,
});

const AppConnected = connect(mapStateToProps)(App);
export default AppConnected;
