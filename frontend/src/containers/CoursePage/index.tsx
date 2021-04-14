import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lampImage from '@assets/course.jpg';
import styles from './styles.module.sass';
import {
  addStudentRoutine,
  fetchAssignmentsRoutine,
  fetchCourseInfoRoutine,
  fetchPostsRoutine,
  fetchSponsorsRoutine,
  fetchStudentsRoutine
} from '@routines/courseRoutines';
import { connect } from 'react-redux';
import { ShortUserInfo } from '@models/userData';
import { PostCreate, PostPreview } from '@models/postData';
import { AssignmentCreate, AssignmentPreview } from '@models/assignmentData';
import Tag from '@components/Tag';
import Menu from '@components/Menu';
import Publication from '@components/Publication';
import PublicationForm from '@components/PublicationForm';
import { createPostRoutine } from '@routines/postRoutines';
import StudentsForm from '@components/StudentsForm';
import PeopleBlock from '@components/PeopleBlock';
import { SponsorPreview } from '@models/sponsorData';
import SponsorCard from '@components/SponsorCard';
import { createAssignmentRoutine } from '@routines/assignmentRoutines';
import Statistics from '@components/Statistics';

enum SelectedMenu {
  Posts,
  Assignments,
  People,
  Sponsors,
  Statistics,
}

interface ICoursePageProps {
  id: string;
  currentUserId: string;
  name: string;
  description: string;
  teacher: ShortUserInfo;
  tags: string[];
  posts: PostPreview[];
  assignments: AssignmentPreview[];
  students: ShortUserInfo[];
  sponsors: SponsorPreview[];
  fetchCourseInfo: (id: string) => any;
  createPost: (data: PostCreate) => any;
  fetchPosts: (courseId: string) => any;
  fetchStudents: (courseId: string) => any;
  fetchSponsors: (courseId: string) => any;
  fetchAssignments: (courseId: string) => any;
  addStudent: (courseId: string, email: string) => any;
  createAssignment: (data: AssignmentCreate) => any;
}

const CoursePage: React.FC<ICoursePageProps> = ({
  id,
  currentUserId,
  name,
  description,
  teacher,
  tags,
  posts,
  assignments,
  students,
  fetchCourseInfo,
  createPost,
  fetchPosts,
  fetchStudents,
  addStudent,
  sponsors,
  fetchSponsors,
  createAssignment,
  fetchAssignments
}) => {
  const { courseId } = useParams() as { courseId: string };
  const [selected, setSelected] = useState(SelectedMenu.Posts);
  const menuItems = [{
    text: 'Posts',
    onClick: () => setSelected(SelectedMenu.Posts)
  }, {
    text: 'Assignments',
    onClick: () => setSelected(SelectedMenu.Assignments)
  }, {
    text: 'People',
    onClick: () => setSelected(SelectedMenu.People)
  }, {
    text: 'Sponsors',
    onClick: () => setSelected(SelectedMenu.Sponsors)
  }, {
    text: 'Statistics',
    onClick: () => setSelected(SelectedMenu.Statistics)
  }];

  const userPostsNum = posts.reduce((num, p) =>
    num + (p.author.id === currentUserId ? 1 : 0) , 0)

  useEffect(() => {
    if (courseId) {
      fetchCourseInfo(courseId);
      fetchPosts(courseId);
      fetchAssignments(courseId);
    }
    if (selected === SelectedMenu.Posts) {
      fetchPosts(courseId);
    } else if (selected === SelectedMenu.People) {
      fetchStudents(courseId);
    } else if (selected === SelectedMenu.Sponsors) {
      fetchSponsors(courseId);
    } else if (selected === SelectedMenu.Assignments) {
      fetchAssignments(courseId);
    }
  }, [courseId, selected]);
  return (
    <div className={styles.course_container}>
      <div className={styles.course_header}>
        <div className={styles.header_text}>
          <div className={styles.course_name}>
            {name}
          </div>
          <div className={styles.course_description}>
            {description}
          </div>
          <div className={styles.tags_container}>
            {tags.map(t => <Tag text={t}/>)}
          </div>
        </div>
        <div className={styles.image_container}>
          <img src={lampImage} alt="lamp"/>
        </div>
      </div>
      <div className={styles.navigation_container}>
        <Menu menuItems={menuItems}/>
      </div>
      <div className={styles.content_container}>
        {selected === SelectedMenu.Posts
        && (
          <>
            <PublicationForm onSubmit={createPost} courseId={id}/>
            {[...posts].reverse()
              .map(p => <Publication id={p.id} text={p.text} author={p.author}/>)}
          </>
        )}
        {selected === SelectedMenu.Assignments
        &&
        <>
          {currentUserId === teacher.id &&
          <PublicationForm courseId={id} onSubmit={createAssignment} isAssignment/>}
          {[...assignments].reverse()
            .map(a =>
              <Publication id={a.id} text={a.title} author={teacher} dueDate={a.deadline}/>)}
        </>}
        {selected === SelectedMenu.People &&
        <>
          {currentUserId === teacher.id && <StudentsForm courseId={id} onSubmit={addStudent}/>}
          <PeopleBlock students={students} teacher={teacher}/>
        </>
        }
        {selected === SelectedMenu.Sponsors
        && sponsors.map(s => <SponsorCard name={s.name} description={s.description}/>)}
        {selected === SelectedMenu.Statistics
        && <>
        <Statistics one={posts.length} two={assignments.length} oneText={'Posts'} twoText={'Assignments'}/>
        <Statistics one={userPostsNum} oneText={'My posts'} two={posts.length - userPostsNum} twoText={'Other posts'}/>
        </>}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  id: state.course.id,
  currentUserId: state.auth.id,
  name: state.course.name,
  description: state.course.description,
  teacher: state.course.teacher,
  tags: state.course.tags,
  posts: state.course.posts,
  assignments: state.course.assignments,
  students: state.course.students,
  sponsors: state.course.sponsors
});

const mapDispatchToProps = {
  fetchCourseInfo: fetchCourseInfoRoutine,
  createPost: createPostRoutine,
  fetchPosts: fetchPostsRoutine,
  addStudent: addStudentRoutine,
  fetchStudents: fetchStudentsRoutine,
  fetchSponsors: fetchSponsorsRoutine,
  createAssignment: createAssignmentRoutine,
  fetchAssignments: fetchAssignmentsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
