import React from "react";
import Task from "./Tasks";

export default function TodoList({ todos, toggleTask }) {
  return todos.map((todo) => {
    return <Task key={todo.id} todos={todo} toggleCheckbox={toggleTask} />;
  });
}
