import React, { useState } from "react";
import { Icon } from "antd";

export default function TaskList(props) {
  const todos = props.items;

  const [state, setSate] = useState({ editing: false });

  const handleEdit = e => {
    setSate({ editing: true });
  };

  const todosList = todos.map((todo, index) => {
    const todostyle = {
      textDecoration: todo.completed && "line-through",
      color: todo.completed && "#ccc",
      margin: "0px",
      display: state.editing && "none"
    };
    const editInputStyle = {
      display: state.editing === false ? "none" : "block",
      width: "80%"
    };

    const handleSubmitDone = e => {
      console.log("done");

      if (e.keyCode === 13) {
        setSate({ editing: false });
      }
    };

    return (
      todo.title !== "" && (
        <div className="listItem" key={index}>
          <input
            style={{ margin: "5px 10px 0 0", padding: "5px", zoom: "1" }}
            type="checkbox"
            onChange={() => props.toggleComplete(todo.id)}
          ></input>
          <li>
            <h3 style={todostyle}>{todo.todo_name}</h3>
            <input
              style={editInputStyle}
              onKeyDown={e => handleSubmitDone(e)}
              onChange={props.onChange}
              value={todo.title}
            ></input>
          </li>
          <Icon
            onClick={e => handleEdit(e)}
            type="edit"
            style={{
              fontSize: "25px",
              color: "green",
              marginTop: "10px",
              marginLeft: "10px",
              cursor: "pointer"
            }}
          />
          <Icon
            onClick={() => props.handleDelete(index)}
            type="delete"
            style={{
              fontSize: "25px",
              color: "red",
              marginTop: "10px",
              marginLeft: "10px",
              cursor: "pointer"
            }}
          />
        </div>
      )
    );
  });

  return <ul>{todosList}</ul>;
}
