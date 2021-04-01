import React from 'react';
import styles from './styles.module.sass';
import logo from '@assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { AuthorizationBlock } from '@components/Header/AuthorizationBlock';
import { NavigationBlock } from '@components/Header/NavigationBlock';

interface IHeaderProps {
  userId: string;
}

export const Header: React.FC<IHeaderProps> = ({ userId }) => {
  const excludedRoutes = ['/login', '/signup'];
  const location = useLocation();
  return !excludedRoutes.includes(location.pathname) ? (
      <div className={styles.header_container}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Storio logo"/>
        </Link>
        {localStorage.getItem('accessToken')
          ? <NavigationBlock userId={userId}/>
          : <AuthorizationBlock/>}
      </div>)
    : null;
};
