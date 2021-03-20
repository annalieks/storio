import React from 'react';
import lampImage from '@assets/course.jpg';
import styles from './styles.module.sass';

const c = {
  'name': 'Mathematics',
  'description': 'Hey! This is Mathematics for everyone!'
};

const CoursePage: React.FC = () => (
  <div className={styles.course_container}>
    <div className={styles.course_header}>
      <div className={styles.header_text}>
        <div className={styles.course_name}>
          {c.name}
        </div>
        <div className={styles.course_description}>
          {c.description}
        </div>
      </div>
      <div className={styles.image_container}>
        <img src={lampImage} alt="lamp"/>
      </div>
    </div>
  </div>
);

export default CoursePage;
