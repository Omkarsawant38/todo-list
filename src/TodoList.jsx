import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "sample Task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;

    const newTaskObj = {
      task: newTodo,
      id: uuidv4(),
      isDone: false,
    };

    setTodos([...todos, newTaskObj]);
    setNewTodo("");
  };

  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h2 className="title">To Do List</h2>

      <input
        className="todo-input"
        placeholder="Add a task..."
        value={newTodo}
        onChange={updateTodoValue}
      />
      <button className="add-btn" onClick={addNewTask}>
        Add
      </button>

      <h4 className="section-title">Task List</h4>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              className="checkbox"
              checked={todo.isDone}
              onChange={() => markAsDone(todo.id)}
            />
            <span className={`todo-text ${todo.isDone ? "done" : ""}`}>
              {todo.task}
            </span>
            <div className="btn-group">
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="edit-btn">Edit</button>
            </div>
          </li>
        ))}
      </ul>

      <p className="counter">
        Completed: {todos.filter((t) => t.isDone).length} | Uncompleted:{" "}
        {todos.filter((t) => !t.isDone).length}
      </p>

      <button className="markall-btn" onClick={markAllDone}>
        ✅ Mark All as Done
      </button>
    </div>
  );
}