import React from 'react';
import { CoursePreview } from '@models/courseData';
import courseImage from '@assets/course-card.jpg';
import styles from './styles.module.sass';

interface ICourseCardProps {
  course: CoursePreview;
}

const CourseCard: React.FC<ICourseCardProps> = ({ course }) => (
  <div className={styles.course_container}>
    <div className={styles.image_container}>
      <img src={courseImage} alt="Lamps" />
    </div>
    <div className={styles.course_header}>{course.name}</div>
    <div className={styles.course_students}>{course.studentsNumber}</div>
  </div>
);

export default CourseCard;
