import React from 'react';
import { CoursePreview } from '@models/courseData';
import styles from './styles.module.sass';
import CourseCard from '@components/CourseCard';

interface ICoursesBlockProps {
  header: string;
  courses: CoursePreview[];
}

const CoursesBlock: React.FC<ICoursesBlockProps> = ({
  header,
  courses
}) => (
  <div className={styles.courses_container}>
    <div className={styles.courses_header}>
      <div className={styles.header_text}>{header}</div>
      <div className={styles.header_underline}/>
    </div>
    <div className={styles.courses_block}>
      {courses.map(c => <CourseCard course={c}/>)}
    </div>
  </div>
);

export default CoursesBlock;
