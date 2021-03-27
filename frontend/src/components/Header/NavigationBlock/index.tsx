import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { history } from '@helpers/history.helper';
import { store } from '@root/store';
import styles from './styles.module.sass';
import { Link, useLocation } from 'react-router-dom';

export const NavigationBlock: React.FC = () => {

  const location = useLocation();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const isHomeLocation = () => Boolean(location.pathname === '/home');

  const signOut = () => {
    localStorage.removeItem('accessToken');
    store.dispatch({
      type: 'AUTHENTICATION:CHANGE',
      payload: false
    });
    history.push('/');
  };

  return (
    <div className={styles.navigation_container}>
      {!isHomeLocation() && (<div className={styles.menu_home}>
        <Link to="/home" className={styles.text_menu}>Home</Link>
      </div>)}
      {isHomeLocation() && (<div className={styles.menu_home}>
        <Link to="/todo" className={styles.text_menu}>To Do</Link>
      </div>)}
      <div
        className={`${styles.menu_home} ${styles.icon_menu}`}
        onClick={() => setUserMenuOpened(!userMenuOpened)}
      >
        <AccountCircleIcon className={styles.user_icon}/>
        {userMenuOpened && <ul className={styles.dropdown_menu}>
          <li className={styles.dropdown_item}>
            <button onClick={() => console.log('On click')}>Profile</button>
          </li>
          <li className={styles.dropdown_item}>
            <button onClick={() => signOut()}>Sign Out</button>
          </li>
        </ul>}
      </div>
    </div>
  );
};
