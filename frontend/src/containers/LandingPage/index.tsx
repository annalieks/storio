import React from 'react';
import styles from './styles.module.sass';
import { Footer } from '@components/Footer';
import { Redirect } from 'react-router-dom';

interface ILandingPageProps {
  isAuthorized: boolean;
}

const LandingPage: React.FC<ILandingPageProps> = ({ isAuthorized }) => {
  return isAuthorized ? <Redirect to="/home"/> : (
    <div className={styles.main_container}>
      <div className={styles.intro_container}>
        <div className={styles.slogan}>
          <div className={styles.slogan_text}>
            <div className={styles.slogan_header}>storio</div>
            <div className={styles.slogan_description}>Invest in the best storage in the world - the brain</div>
          </div>
        </div>
      </div>
      <div className={styles.quote_container}>
        <div className={styles.quote_description}>
          <p className={styles.quote_text}>"The key to pursuing excellence is to embrace an organic, long-term<br/>
            learning process, and not to live in a shell of static, safe mediocrity.<br/>
            Usually, growth comes at the expense of previous comfort or safety."
          </p>
          <p className={styles.quote_author}>— Josh Waitzkin</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
