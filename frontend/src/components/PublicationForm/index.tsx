import React, { useState } from 'react';
import styles from './styles.module.sass';
import GradientButton from '@components/GradientButton';

interface IPublicationFormProps {
  userId: string;
  isAssignment?: boolean;
}

const PublicationForm: React.FC<IPublicationFormProps> = ({
  userId,
  isAssignment
}) => {
  const [text, setText] = useState('');

  return (
    <div className={styles.form_container}>
      <textarea
        className={styles.input_container}
        placeholder="Type your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.button_container}>
        <GradientButton text="Create Post" onClick={() => console.log('Placeholder create course')}/>
      </div>
    </div>
  );
};

export default PublicationForm;
