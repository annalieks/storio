import React from 'react';
import styles from './styles.module.sass';

interface ITagProps {
  text: string;
}

const Tag: React.FC<ITagProps> = ({ text }) => (
  <div className={styles.tag_container}>{text}</div>
);

export default Tag;
