import React, { useEffect } from 'react';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ToDoItem from '@components/ToDoItem';
import styles from './styles.module.sass';
import AddToDo from '@components/AddToDo';
import { ToDoPreview } from '@models/toDoData';
import { fetchUserToDosRoutine } from '@routines/userRoutines';
import { addToDoRoutine, changeToDoRoutine, deleteToDoRoutine } from '@routines/toDoRoutines';
import { connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';

interface IToDoProps {
  todos: ToDoPreview[];
  fetchToDos: () => any;
  addToDo: (text: string) => any;
  deleteToDo: (id: string) => any;
  changeToDo: (todo: ToDoPreview) => any;
}

const ToDo: React.FC<IToDoProps> = ({
  todos,
  fetchToDos,
  addToDo,
  deleteToDo,
  changeToDo
}) => {
  useEffect(() => {
    fetchToDos();
  }, []);
  const doneNumber = todos.reduce((total, elem) =>
    (elem.done ? total + 1 : total), 0);

  const defaultLabelStyle = {
    fontSize: '0.7em',
  };

  return (<div className={styles.todo_content}>
      <h2 className={styles.todo_header}>
        Your ToDo list
      </h2>
      <div className={styles.todo_list}>
        <div className={styles.add_todo_wrapper}>
          <AddToDo addCallback={(text: string) => addToDo(text)}/>
        </div>
        {
          [...todos].reverse()
            .map((todo) => (
              <div className={styles.todo_item_wrapper}>
                <ToDoItem
                  id={todo.id}
                  key={todo.id}
                  text={todo.text}
                  done={todo.done}
                  changeCallback={(toDo) => changeToDo(toDo)}
                  deleteCallback={(id) => deleteToDo(id)}
                />
              </div>
            ))
        }
      </div>
      <div className={styles.chart_container}>
        <PieChart
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
          labelStyle={defaultLabelStyle}
          data={[
            {
              title: 'Done',
              value: doneNumber,
              color: '#4AB37A'
            },
            {
              title: 'Not Done',
              value: todos.length - doneNumber,
              color: '#F8A353'
            }
          ]}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  todos: state.toDo.todos
});

const mapDispatchToProps = {
  fetchToDos: fetchUserToDosRoutine,
  addToDo: addToDoRoutine,
  deleteToDo: deleteToDoRoutine,
  changeToDo: changeToDoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
