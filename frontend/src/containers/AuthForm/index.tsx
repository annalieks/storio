import React, { MouseEvent, useState } from 'react';
import styles from './styles.module.sass';
import { TextField } from '@material-ui/core';
import signupImage from '@assets/signup.jpg';
import loginImage from '@assets/login.jpg';
import { connect } from 'react-redux';
import { loginRoutine, signupRoutine } from '@routines/userRoutines';
import { LoginData, RegisterData } from '@models/userData';
import { Redirect } from 'react-router-dom';

interface IAuthFormProps {
  register: boolean;
  isAuthorized: boolean;
  login: (data: LoginData) => any;
  signup: (data: RegisterData) => any;
}

const AuthForm: React.FC<IAuthFormProps> = ({
    register,
    isAuthorized,
    login,
    signup
  }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const background = register ? signupImage : loginImage;
    const handleSubmit = (e: MouseEvent) => {
      e.preventDefault();
      if (register) {
        signup({
          email,
          firstName,
          lastName,
          password
        });
      } else {
        login({
          email,
          password
        });
      }
    };
    return (isAuthorized ? <Redirect to="/home"/> : (
      <>
        <div
          style={{ backgroundImage: `url(${background})` }}
          className={`${styles.auth_container} ${styles.auth_background}`}
        />
        <div className={styles.auth_container}>
          <form className={styles.auth_form}>
            <div className={styles.auth_header}>Welcome!</div>
            <TextField
              id="email"
              label="Email"
              className={styles.auth_text}
              onChange={(e) => setEmail(e.target.value)}
            />
            {
              register &&
              <>
                <TextField
                  id="firstName"
                  label="First Name"
                  className={styles.auth_text}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  className={styles.auth_text}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            }
            <TextField
              id="password"
              label="Password"
              autoComplete="current-password"
              type="password"
              className={styles.auth_text}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={styles.auth_button}
              onClick={(e) => handleSubmit(e)}
            >
              {register ? 'Sign Up' : 'Log in'}
            </button>
          </form>
        </div>
      </>
    ));
  }
;

const mapStateToProps = (state: any) => ({
  isAuthorized: state.auth.isAuthorized,
});

const mapDispatchToProps = {
  login: loginRoutine,
  signup: signupRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
