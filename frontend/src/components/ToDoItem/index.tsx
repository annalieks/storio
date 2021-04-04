import React, { useState } from 'react';
import styles from './styles.module.sass';
import ClearIcon from '@material-ui/icons/Clear';
import { ToDoPreview } from '@models/toDoData';

interface IToDoItemProps {
  id: string;
  text: string;
  done: boolean;
  changeCallback: (x: ToDoPreview) => void;
  deleteCallback: (id: string) => void;
}

const ToDoItem: React.FC<IToDoItemProps> = ({
  id,
  text,
  done,
  changeCallback,
  deleteCallback
}) => {
  const [todoText, setText] = useState(text);
  const [todoDone, setDone] = useState(done);
  return (
    <div className={`${styles.todo_item} ${todoDone ? styles.todo_done : ''}`}>
      <div className={styles.done_controller}>
        <input
          className={`${styles.giant_checkbox}`}
          type="checkbox"
          checked={todoDone}
          onChange={() => {
            setDone(!todoDone);
            changeCallback({
              id,
              text,
              done: !todoDone,
            })
          }}
        />
      </div>

      <div className={styles.todo_item_inner}>
        <input
          className={styles.todo_text_input}
          value={todoText}
          onChange={(e) => {
            setText(e.target.value);
            changeCallback({
              id,
              text: e.target.value,
              done
            });
          }}
        >
        </input>
      </div>

      <div className={styles.edit_delete_controllers}>
        <div className={styles.delete_icon_wrapper} onClick={() => deleteCallback(id)}><ClearIcon/></div>
      </div>
    </div>
  );
};

export default ToDoItem;
