import React, { useState } from 'react';
import styles from './styles.module.sass';
import GradientButton from '@components/GradientButton';

interface IStudentsFormProps {
  courseId: string,
  onSubmit: (id: string, email: string) => any;
}

const StudentsForm: React.FC<IStudentsFormProps> = ({
  courseId,
  onSubmit
}) => {
  const [text, setText] = useState('');
  const submit = () => {
    if (!text) {
      return;
    }
    onSubmit(courseId, text.trim());
  };

  return (
    <div className={styles.form_container}>
      <input
        className={styles.input_container}
        placeholder="Enter student email"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.button_container}>
        <GradientButton
          text="Add Student"
          onClick={() => submit()}
        />
      </div>
    </div>
  );
};

export default StudentsForm;
