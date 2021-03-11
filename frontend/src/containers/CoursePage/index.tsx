import React from 'react';
import styles from './styles.module.sass';

const c = {
  'name': 'Mathematics',
  'description': 'Hey! This is Mathematics for everyone!',
}

export const CoursePage: React.FC = () => (
  <div className={styles.course_container}>
    <div className={styles.course_header}>
      <div className={styles.course_name}>
        {c.name}
      </div>
      <div className={styles.course_description}>
        {c.description}
      </div>
    </div>
  </div>
);
