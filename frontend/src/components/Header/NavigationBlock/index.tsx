import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './styles.module.sass';
import { Link, useLocation } from 'react-router-dom';

export const NavigationBlock: React.FC = () => {

  const location = useLocation();
  const isHomeLocation = () => Boolean(location.pathname === '/home');

  return (
    <div className={styles.navigation_container}>
      {!isHomeLocation() && (<div className={styles.menu_home}>
        <Link to="/home" className={styles.text_menu}>Home</Link>
      </div>)}
      {isHomeLocation() && (<div className={styles.menu_home}>
        <Link to="/todo" className={styles.text_menu}>To Do</Link>
      </div>)}
      <div className={`${styles.menu_home} ${styles.icon_menu}`}>
        <AccountCircleIcon className={styles.user_icon}/>
      </div>
    </div>
  );
};
