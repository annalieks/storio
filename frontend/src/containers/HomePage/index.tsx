import React from 'react';
import { connect } from 'react-redux';
import { CoursePreview } from '@models/courseData';
import styles from './styles.module.sass';
import CoursesBlock from '@components/CoursesBlock';

const coursesMock: CoursePreview[] = [
  {
    name: 'Mathematics',
    studentsNumber: 23,
  },
  {
    name: 'Physics',
    studentsNumber: 24,
  },
  {
    name: 'Theory Of Probability',
    studentsNumber: 26,
  },
  {
    name: 'Physics',
    studentsNumber: 24,
  }
];

interface IHomePageProps {
  studentCourses: CoursePreview[];
  authorCourses: CoursePreview[];
}

const HomePage: React.FC<IHomePageProps> = ({
  studentCourses,
  authorCourses,
}) => (
  <div className={styles.home_container}>
    <div className={styles.todo_container}>

    </div>
    <CoursesBlock header="Student courses" courses={coursesMock} />
    <CoursesBlock header="Author courses" courses={coursesMock} />
  </div>
);

export default connect()(HomePage);
