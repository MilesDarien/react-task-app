import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/dist/v4";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = "todoApp.todos";

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTodos(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTask = (id) => {
    const newTasks = [...todos];
    const todo = newTasks.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTasks);
  };

  const handleRemoveTask = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTask={toggleTask} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleRemoveTask}>Clear Completed Tasks</button>
      <p>{todos.filter((todo) => !todo.complete).length} Tasks Remaining.</p>
    </>
  );
}

export default App;
