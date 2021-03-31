import React, {useState} from 'react';
import styles from './styles.module.sass';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

interface AddToDoProps {
  addCallback: (text: string)=>void
}

const AddToDo: React.FC<AddToDoProps> = ({
  addCallback
}) => {
  const [text, setText] = useState('');
  return (    
    <div className={styles.todo_item}>
      <div className={styles.add_todo_button_wrapper}>
        <div 
          className={styles.add_todo_button}
          onClick={() => {
            if(!text) {
              return;
            }
            addCallback(text);
            setText('');
          }}
        >
          <AddCircleOutlineSharpIcon 
            className={styles.add_todo_icon} 
            fontSize={'large'}
          />
        </div>
      </div>
      <div className={styles.add_todo_input_wrapper}>
        <input 
          className={styles.todo_text_input} 
          value={text}
          onChange={(e) => setText(e.target.value)}
        >
        </input>
      </div>
    </div>  
  )
}

export default AddToDo;
