import React, { useState, useEffect } from "react";
import FormComponent from "./Components/Form";
import TaskList from "./Components/TaskList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("/find/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const onHandleChange = e => setValue(e.target.value);

  const onHandleSubmit = e => {
    e.preventDefault();

    const newTask = value;

    const body = {
      name: newTask,
      id: Date.now()
    };

    if (newTask !== "") {
      // fetch('/add/todos', {
      //   method: 'post',
      //   body: JSON.stringify(body),
      //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      // })
      //   .then(res => console.log(res.json()))
      //   .then(() => {
      //     setTodos([...todos, { id: Date.now(), title: newTask, completed: false }])
      //   })

      setTodos([
        ...todos,
        { id: Date.now(), todo_name: newTask, completed: false }
      ]);

      setValue("");
      console.log(todos);
    }
  };
  const onHandleDelete = index => {
    const filteredTodos = todos.filter((task, i) => i !== index);
    setTodos(filteredTodos);
  };

  const toggleComplete = id => {
    todos.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
    setTodos([...todos]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List App</h1>
      </header>
      <div className="main">
        <FormComponent
          handleChange={onHandleChange}
          userInput={value}
          handleSubmit={onHandleSubmit}
        />
        <TaskList
          items={todos}
          handleDelete={onHandleDelete}
          toggleComplete={id => toggleComplete(id)}
          handleChange={onHandleChange}
        />
      </div>
    </div>
  );
}

export default App;
