import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import studentImage from '@assets/user.webp';
import styles from './styles.module.sass';
import { Checkbox } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

interface IToDoItemProps {
  id: string;
  text: string;
  done: boolean;
  // Yes, I know it's bad. I just hope that when Redux comes this won't be needed at all
  changeCallback: (x: {id: string, text: string, done: boolean}) => void;
  deleteCallback: ()=>void;
}

const ToDoItem: React.FC<IToDoItemProps> = ({
  id,
  text,
  done,
  changeCallback,
  deleteCallback
}) => {
  // const [edit, setEdit] = useState(false);
  return (
    <div className={`${styles.todo_item} ${done ? styles.todo_done : ''}`}>
      <div className={styles.done_controller}>
        <input 
          className={`${styles.giant_checkbox}`} 
          type="checkbox"
          checked={done}
          onChange={() => changeCallback({id, text, done: !done})} 
        />
      </div>

      <div className={styles.todo_item_inner}>
        <input 
          className={styles.todo_text_input} 
          value={text}
          onChange={(e) => changeCallback({id, text: e.target.value, done})}
        >
        </input>
      </div>
      
      <div className={styles.edit_delete_controllers}>
        <div className={styles.delete_icon_wrapper} onClick={deleteCallback}><ClearIcon /></div>
      </div>
    </div>  
  );
}

export default ToDoItem;
