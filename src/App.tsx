import React from 'react';
import Auth from './Auth';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Auth />
    </div>
  );
};

export default App;
