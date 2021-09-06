import React from "react";

export default function Tasks({ todos, toggleCheckbox }) {
  const handleTaskCheck = () => {
    toggleCheckbox(todos.id);
  };
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todos.complete}
          onChange={handleTaskCheck}
        />
        {todos.name}
      </label>
    </div>
  );
}
