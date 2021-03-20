import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from '@helpers/history.helper';
import { CoursePreview } from '@models/courseData';
import styles from './styles.module.sass';
import CoursesBlock from '@components/CoursesBlock';
import GradientButton from '@components/GradientButton';
import { fetchStudentCoursesRoutine, fetchTeacherCoursesRoutine } from '@routines/courseRoutines';
import { fetchUserInfoRoutine } from '@routines/userRoutines';
import { fetchUserInfo } from '@containers/AuthForm/service';

interface IHomePageProps {
  userId: string;
  studentCourses: CoursePreview[];
  teacherCourses: CoursePreview[];
  fetchStudentCourses: (id: string) => any;
  fetchTeacherCourses: (id: string) => any;
  fetchUserInfo: () => any;
}

const HomePage: React.FC<IHomePageProps> = ({
  userId,
  studentCourses,
  teacherCourses,
  fetchStudentCourses,
  fetchTeacherCourses,
  fetchUserInfo,
}) => {
  useEffect(() => {
    fetchUserInfo();
    fetchStudentCourses(userId);
    fetchTeacherCourses(userId);
  }, []);
  return (
    <div className={styles.home_container}>
      <div className={styles.controls_container}>
        <GradientButton text="+ Create Course" onClick={() => (history.push('/create/course'))}/>
      </div>
      <CoursesBlock header="Student courses" courses={studentCourses}/>
      <CoursesBlock header="Author courses" courses={teacherCourses}/>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.auth.id,
  studentCourses: state.home.studentCourses,
  teacherCourses: state.home.teacherCourses
});

const mapDispatchToProps = {
  fetchStudentCourses: fetchStudentCoursesRoutine,
  fetchTeacherCourses: fetchTeacherCoursesRoutine,
  fetchUserInfo: fetchUserInfoRoutine,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
