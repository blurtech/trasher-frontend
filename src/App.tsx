import React, { useState } from 'react';
import Auth from './components/Auth';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  return (<>
    {authorized ?
      <div /> :
      <div className={styles.App}>
        <Auth/>
      </div>
    }</>
  );
};

export default App;
