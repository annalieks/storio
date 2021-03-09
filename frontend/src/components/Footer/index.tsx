import React from 'react';
import styles from './styles.module.sass';

export const Footer: React.FC = () => (
  <div className={styles.footer_container}>
    <ul className={styles.footer_column}>
      <li className={styles.footer_item}>About</li>
      <li className={styles.footer_item}>Privacy Policy</li>
    </ul>
    <ul className={styles.footer_column}>
      <li className={styles.footer_item}>Prices</li>
    </ul>
  </div>
);
