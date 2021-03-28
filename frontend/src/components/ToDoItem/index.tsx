import React from 'react';
import { history } from '@helpers/history.helper';
import { ShortUserInfo } from '@models/userData';
import styles from './styles.module.sass';

interface IToDoItemProps {
  id: string,
  done: boolean,
  text: string,
  deleteCallback: Function
}

const Publication: React.FC<IToDoItemProps> = ({
  id,
  done,
  text,
  deleteCallback
}) => {
  return (
    <div className={styles.publication_container}>
      
    </div>
  );
};

export default Publication;