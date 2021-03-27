import React, { useState } from 'react';
import styles from './styles.module.sass';
import GradientButton from '@components/GradientButton';
import { PostCreate } from '@models/postData';
import { AssignmentCreate } from '@models/assignmentData';

interface IPublicationFormProps {
  courseId: string,
  isAssignment?: boolean;
  onSubmit: (data: PostCreate | AssignmentCreate) => any;
}

const PublicationForm: React.FC<IPublicationFormProps> = ({
  courseId,
  isAssignment,
  onSubmit
}) => {
  const [text, setText] = useState('');
  const submit = () => {
    if (!text)
      return;
    onSubmit({
      courseId, // todo: assignment case
      text: text.trim(),
    });
  };

  return (
    <div className={styles.form_container}>
      <textarea
        className={styles.input_container}
        placeholder="Type your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.button_container}>
        <GradientButton
          text={isAssignment ? 'Create Assignment' : 'Create Post'}
          onClick={() => submit()}
        />
      </div>
    </div>
  );
};

export default PublicationForm;
