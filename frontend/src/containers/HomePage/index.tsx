import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from '@helpers/history.helper';
import { CoursePreview } from '@models/courseData';
import styles from './styles.module.sass';
import CoursesBlock from '@components/CoursesBlock';
import GradientButton from '@components/GradientButton';
import { fetchStudentCoursesRoutine, fetchTeacherCoursesRoutine } from '@routines/courseRoutines';
import { fetchUserInfoRoutine } from '@routines/userRoutines';
import Statistics from '@components/Statistics';

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
  fetchUserInfo
}) => {
  useEffect(() => {
    fetchUserInfo();
    fetchStudentCourses(userId);
    fetchTeacherCourses(userId);
  }, []);
  const studentsOnStudentCourses = () => studentCourses.reduce((a, b) => a + b.studentsNum, 0);
  const studentsOnTeacherCourses = () => teacherCourses.reduce((a, b) => a + b.studentsNum, 0);

  return (
    <div className={styles.home_container}>
      <div className={styles.controls_container}>
        <GradientButton text="+ Create Course" onClick={() => (history.push('/create/course'))}/>
      </div>
      <CoursesBlock header="Student courses" courses={studentCourses}/>
      <CoursesBlock header="Author courses" courses={teacherCourses}/>
      <Statistics
        one={studentCourses.length}
        oneText={'Student Courses'}
        two={teacherCourses.length}
        twoText={'Teacher Courses'}
        colorOne={'#F8A353'}
        colorTwo={'#4C4C4C'}
      />
      <Statistics
        one={studentsOnStudentCourses()}
        oneText={'Students on student courses'}
        two={studentsOnTeacherCourses()}
        twoText={'Students on teacher courses'}
      />
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
  fetchUserInfo: fetchUserInfoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
