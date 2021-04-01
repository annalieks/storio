import React, { useState } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import { store } from '@root/store';
import AppRouter from '@containers/AppRouter';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ToDoItem from '@components/ToDoItem';
import styles from './styles.module.sass';
import AddToDo from '@components/AddToDo';

const App: React.FC = () => {

  // TODO: use redux
  const [todos, setTodos] = useState([
    {
      id: '1',
      text: 'walk a dog',
      done: false
    }
  ]);

  return (<div className={styles.todo_content}>
      <h2 className={styles.todo_header}>
        Your ToDo list
      </h2>
      <div className={styles.todo_list}>
        <div className={styles.add_todo_wrapper}>
          <AddToDo addCallback={(text: string) => {
            const newTodo = {
              id: text+'1221',
              text,
              done: false
            };
            setTodos([newTodo, ...todos]);
          }}/>
        </div>
        {
          todos.map((todo, index) => (
            <div className={styles.todo_item_wrapper}>
              <ToDoItem 
                id={todo.id}
                key={todo.id}
                text={todo.text}
                done={todo.done}
                changeCallback={(val) => {
                  const newTodos = todos.map((todo, i) => i == index ? val : todo);
                  setTodos(newTodos);
                }}
                deleteCallback={() => {
                  const newTodos = todos.filter((todo, i) => i !== index);
                  setTodos(newTodos);
                }}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default App;
