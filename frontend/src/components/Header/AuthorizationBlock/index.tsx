import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';

export const AuthorizationBlock: React.FC = () => (
  <div className={styles.authorization_container}>
    <Link to="/login">
    <div className={styles.menu_item}>Log In</div>
    </Link>
    <Link to="/signup">
    <div className={styles.menu_item}>Sign Up</div>
    </Link>
  </div>
);
