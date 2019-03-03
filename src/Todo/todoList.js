import React, { memo } from "react";
// import PropTypes from "prop-types";

const todoList = ({ todos, onCompleteTask, deleteTodo, status }) => {
  const filteredTodos = todos.filter(x => {
    if (status === "pending") {
      return !x.isDone;
    } else if (status === "completed") {
      return x.isDone;
    } else {
      return true;
    }
  });
  return (
    <div
      style={{
        overflow: "auto",
        width: "100%"
      }}
    >
      {filteredTodos.map(item => (
        <div style={{ display: "flex", margin: 10 }} key={item.id}>
          <input
            type="checkbox"
            defaultChecked={item.isDone}
            value={item.isDone}
            onClick={() => onCompleteTask(item.id)}
          />
          <span
            style={{
              display: "flex",
              flex: 1,
              padding: "0 10px",
              textDecoration: item.isDone ? "line-through" : "none"
            }}
          >
            {item.text}
          </span>
          <button style={{ height: 30 }} onClick={() => deleteTodo(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

todoList.propTypes = {};

export default memo(todoList);
