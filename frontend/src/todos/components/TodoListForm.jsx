import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  card: {
    margin: '1rem',
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(todoList.todos);

  const handleDeleteTodo = (index) => {
    setTodos([
      // immutable delete
      ...todos.slice(0, index),
      ...todos.slice(index + 1),
    ]);
  };

  useEffect(() => {
    saveTodoList(todoList.id, { todos });
  }, [todos]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{todoList.title}</Typography>
        <form className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Checkbox
                color="primary"
                checked={todo.checked}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    { ...todo, checked: event.target.checked },
                    ...todos.slice(index + 1),
                  ]);
                }}
                tabIndex={-1}
                inputProps={{ 'aria-labelledby': index }}
              />
              <TextField
                label="What to do?"
                value={todo.name}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    { ...todo, name: event.target.value },
                    ...todos.slice(index + 1),
                  ]);
                }}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => handleDeleteTodo(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, '']);
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
