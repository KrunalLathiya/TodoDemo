import React, { useState } from "react";

// Define an interface for our component's props
interface UserProfileProps {
  name: string;
  age?: number; // Optional property
}

// Define a type for our todo item
type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const User: React.FC<UserProfileProps> = ({ name, age }) => {
  // Typed state for todos
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Typed input state
  const [inputText, setInputText] = useState<string>("");

  // Typed function with explicit return type
  const addTodo = (): void => {
    if (inputText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  };

  // Typed event handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // Typed toggle function
  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {name} {age && `(${age} years old)`}
      </h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter a todo"
          className="border p-2 flex-grow mr-2"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2">
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`cursor-pointer ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
