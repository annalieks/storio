import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lampImage from '@assets/course.jpg';
import styles from './styles.module.sass';
import { fetchCourseInfoRoutine } from '@routines/courseRoutines';
import { connect } from 'react-redux';
import { ShortUserInfo } from '@models/userData';
import { PostPreview } from '@models/postData';
import { AssignmentPreview } from '@models/assignmentData';
import Tag from '@components/Tag';
import Menu from '@components/Menu';
import Publication from '@components/Publication';
import GradientButton from '@components/GradientButton';
import PublicationForm from '@components/PublicationForm';

enum SelectedMenu {
  Posts,
  Assignments,
  People,
  Sponsors,
}

interface ICoursePageProps {
  id: string;
  userId: string;
  name: string;
  description: string;
  teacher: ShortUserInfo;
  tags: string[];
  posts: PostPreview[];
  assignments: AssignmentPreview[];
  students: ShortUserInfo[];
  fetchCourseInfo: (id: string) => any;
}

const assignmentMock: AssignmentPreview = {
  id: '1',
  text: 'abc',
  dueDate: '1 March 24:00',
  author: {
    id: '2',
    firstName: 'Some',
    lastName: 'User',
    email: 'aaa'
  }
};

const CoursePage: React.FC<ICoursePageProps> = ({
  id,
  userId,
  name,
  description,
  teacher,
  tags,
  posts,
  assignments,
  students,
  fetchCourseInfo
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
  }];

  useEffect(() => {
    if (courseId) {
      fetchCourseInfo(courseId);
    }
  }, [courseId]);
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
            <PublicationForm userId={userId} />
            <Publication id={assignmentMock.id} text={assignmentMock.text} author={assignmentMock.author}/>
            {posts.map(p => <Publication id={p.id} text={p.text} author={p.author}/>)}
          </>
        )}
        {selected === SelectedMenu.Assignments
        && assignments.map(a =>
          <Publication id={a.id} text={a.text} author={a.author} dueDate={a.dueDate}/>)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId : state.auth.id,
  id: state.course.id,
  name: state.course.name,
  description: state.course.description,
  teacher: state.course.teacher,
  tags: state.course.tags,
  posts: state.course.posts,
  assignments: state.course.assignments,
  students: state.course.students
});

const mapDispatchToProps = {
  fetchCourseInfo: fetchCourseInfoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
