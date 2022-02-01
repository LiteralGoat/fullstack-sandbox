import React, { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Typography from '@material-ui/core/Typography';
import { TodoListForm } from './TodoListForm';
import axios from 'axios';

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    fetch('/api/get_todos')
      .then((res) => res.json())
      .then(setTodoLists);
  }, []);

  const handleSaveTodoList = (id, { todos }) => {
    const listToUpdate = todoLists[id];
    const update = { ...todoLists, [id]: { ...listToUpdate, todos } };
    setTodoLists(update);
    axios.post('/api/save_todos', update);
  };

  if (!Object.keys(todoLists).length) return null;
  return (
    <>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, todos) => {
            handleSaveTodoList(id, todos);
          }}
        />
      )}
    </>
  );
};
