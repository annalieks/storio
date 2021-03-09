import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './styles.module.sass';

export const NavigationBlock : React.FC = () => (
  <div className={styles.navigation_container}>
    <div className={styles.menu_home}>Home</div>
    <div className={styles.menu_home}>
      <AccountCircleIcon />
    </div>
  </div>
);
