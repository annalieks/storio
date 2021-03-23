import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import lampImage from '@assets/course.jpg';
import styles from './styles.module.sass';

const c = {
  'name': 'Mathematics',
  'description': 'Hey! This is Mathematics for everyone!'
};

const CoursePage: React.FC = () => {
  const { courseId } = useParams() as { courseId: string };
  useEffect(() => {
    if (courseId) {
      console.log(courseId);
    }
  }, []);
  return (
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
};

export default CoursePage;
