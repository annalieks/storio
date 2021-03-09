import React from 'react';
import styles from './styles.module.sass';

export const AuthorizationBlock: React.FC = () => (
  <div className={styles.authorization_container}>
    <div className={styles.menu_item}>Log In</div>
    <div className={styles.menu_item}>Sign Up</div>
  </div>
);
