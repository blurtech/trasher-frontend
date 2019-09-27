import React, { useState } from 'react';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel/AdminPanel';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  return (<>
    {authorized ?
      <AdminPanel /> :
      <div className={styles.App}>
        <Auth/>
      </div>
    }</>
  );
};

export default App;
