import React from 'react';
import { history } from '@helpers/history.helper';
import { ShortUserInfo } from '@models/userData';
import styles from './styles.module.sass';

interface IPublicationProps {
  id: string;
  text: string;
  author: ShortUserInfo;
  dueDate?: string; // for assignment
}

const Publication: React.FC<IPublicationProps> = ({
  id,
  text,
  author,
  dueDate
}) => {
  const handleAuthorClick = () => {
    history.push(`/user/${author.id}`);
  };
  return (
    <div className={styles.publication_container}>
      {dueDate
      && <div className={`${styles.due_date} ${styles.colored_text}`}>
        <p>Due {dueDate}</p>
      </div>}
      <div className={styles.text}>{text}</div>
      <div className={`${styles.author_info} ${styles.colored_text}`} onClick={() => handleAuthorClick()}>
        <p>
          by {author?.firstName} {author?.lastName}
        </p>
      </div>
    </div>
  );
};

export default Publication;
