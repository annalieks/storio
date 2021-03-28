import React from 'react';
import styles from './styles.module.sass';
import { ShortUserInfo } from '@models/userData';
import StudentCard from '@components/StudentCard';

interface IPeopleBlockProps {
  teacher: ShortUserInfo;
  students: ShortUserInfo[];
}

const PeopleBlock: React.FC<IPeopleBlockProps> = ({
  teacher,
  students
}) => (
  <div className={styles.people_container}>
    <div className={styles.header}>Teacher</div>
    <div className={styles.cards_container}>
      <StudentCard id={teacher.id} firstName={teacher.firstName} lastName={teacher.lastName} isTeacher/>
    </div>
    <div className={styles.header}>Students</div>
    <div className={styles.cards_container}>
      {students.map(s => <StudentCard id={s.id} firstName={s.firstName} lastName={s.lastName}/>)}
    </div>
  </div>
);

export default PeopleBlock;
