import React, { useState } from 'react';
import styles from './styles.module.sass';
import { toastr } from 'react-redux-toastr';
import GradientButton from '@components/GradientButton';
import moment from 'moment';
import { TextField } from '@material-ui/core';

interface IPublicationFormProps {
  courseId: string,
  isAssignment?: boolean;
  onSubmit: (data: any) => any;
}

const PublicationForm: React.FC<IPublicationFormProps> = ({
  courseId,
  isAssignment,
  onSubmit
}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [maxGrade, setMaxGrade] = useState(0);
  const [deadline, setDeadline] = useState('');

  const submit = () => {
    if (!text && !isAssignment) {
      return;
    }
    if (isAssignment) {
      if (!validateDate()) return;
      if (!validateText()) return;
      onSubmit({
        courseId,
        title: title.trim(),
        description: text.trim(),
        maxGrade,
        deadline: new Date(deadline)
      });
    } else {
      onSubmit({
        courseId,
        text: text.trim()
      });
    }
  };

  const validateDate = (): boolean => {
    if (!moment(new Date(deadline))
      .isValid()) {
      toastr.error('Wrong input', 'Date is incorrect');
      return false;
    }
    const inputDate = new Date(deadline);
    if (inputDate < (new Date())) {
      toastr.error('Wrong input', 'Deadline must be set later then the current date');
      return false;
    }
    return true;
  };

  const validateText = (): boolean => {
    if (!title) {
      toastr.error('Wrong input', 'Title cannot be empty');
      return false;
    }
    return true;
  };

  return (
    <div className={styles.form_container}>
      {isAssignment &&
      <input
        className={styles.input_container}
        placeholder="Assignment title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />}
      <textarea
        className={styles.text_container}
        placeholder="Type your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.button_container}>
        {isAssignment &&
        <>
          <div className={styles.grade_label}>
            Max grade:
            <input
              className={styles.grade_container}
              type="text"
              pattern="[0-9]*"
              value={maxGrade}
              onChange={(e) =>
                setMaxGrade(parseInt(e.target.value || '0'))
              }
            />
          </div>
          <TextField
            value={deadline}
            id="datetime-local"
            label="Deadline"
            type="datetime-local"
            defaultValue={new Date()}
            className={styles.deadline}
            InputLabelProps={{
              shrink: true,
              className: styles.date
            }}
            onChange={e => setDeadline(e.target.value)}
          />
        </>
        }
        <GradientButton
          text={isAssignment ? 'Create Assignment' : 'Create Post'}
          onClick={() => submit()}
        />
      </div>
    </div>
  );
};

export default PublicationForm;
