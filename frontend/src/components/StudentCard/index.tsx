import React from 'react';
import { Link } from 'react-router-dom';
import studentImage from '@assets/user.webp';
import styles from './styles.module.sass';

interface IStudentCardProps {
  id: string;
  firstName: string;
  lastName: string;
  isTeacher?: boolean;
}

const StudentCard: React.FC<IStudentCardProps> = ({
  id,
  firstName,
  lastName,
  isTeacher
}) => (
  <Link to={`/user/${id}`} className={styles.link}>
    <div className={`${styles.student_container} ${isTeacher ? styles.green_border : styles.blue_border}`}>
      <div className={styles.image_container}>
        <img src={studentImage} alt="Blue lamp"/>
      </div>
      <div className={styles.student_name}>{firstName} {lastName}</div>
    </div>
  </Link>
);

export default StudentCard;
