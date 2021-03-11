import React from 'react';
import styles from './styles.module.sass';
import { TextField } from '@material-ui/core';
import signupImage from '@assets/signup.jpg';
import loginImage from '@assets/login.jpg';

interface IAuthFormProps {
  register: boolean;
}

export const AuthForm: React.FC<IAuthFormProps> = ({ register }) => {
  const background = register ? signupImage : loginImage;
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className={`${styles.auth_container} ${styles.auth_background}`}
      />
      <div className={styles.auth_container}>
        <form className={styles.auth_form}>
          <div className={styles.auth_header}>Welcome!</div>
          <TextField id="email" label="Email" className={styles.auth_text} />
          {
            register &&
            <>
              <TextField id="first_name" label="First Name"  className={styles.auth_text}/>
              <TextField id="last_name" label="Last Name" className={styles.auth_text}/>
            </>
          }
          <TextField
            id="password"
            label="Password"
            autoComplete="current-password"
            type="password"
            className={styles.auth_text}
          />
          <button type="submit" className={styles.auth_button}>
            { register ? 'Sign Up' : 'Log in' }
          </button>
        </form>
      </div>
    </>
  );
};
