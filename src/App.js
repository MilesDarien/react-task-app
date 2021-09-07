import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/dist/v4";
import useLState from "./useLState";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef(); //pulls info from the input without using form.

  // saves state to localStorage & gets localStorage state
  useLState(todos, setTodos, "todoApp.todos");

  // handles adding tasks
  const handleAddTask = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  };

  // handles task completion
  const toggleTask = (id) => {
    const newTasks = [...todos];
    const todo = newTasks.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTasks);
  };

  //handles removing task
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
