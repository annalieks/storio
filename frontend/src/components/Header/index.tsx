import React from 'react';
import styles from './styles.module.sass';
import logo from '@assets/logo.png';
import { useLocation } from 'react-router-dom';
import { AuthorizationBlock } from '@components/Header/AuthorizationBlock';
import { NavigationBlock } from '@components/Header/NavigationBlock';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  isAuthorized: boolean,
}

export const Header: React.FC<IHeaderProps> = ({ isAuthorized }) => {
  const excludedRoutes = ['/login', '/register'];
  const location = useLocation();
  return !excludedRoutes.includes(location.pathname) ? (
      <div className={styles.header_container}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Storio logo"/>
        </Link>
        {isAuthorized ? <NavigationBlock/> : <AuthorizationBlock/>}
      </div>)
    : null;
};
