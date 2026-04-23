import React, { useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const initialData = [
    {
      id: 1,
      title: "Reading",
      description: "I need to read some books",
      status: "complete",
    },
  ];

  const [todoData, setTodoData] = useState(initialData);

  const [editValue, setEditValue] = useState(null);

  const add = (input) => {
    if (!input.title || !input.description) {
      return alert("Title and Description must be required");
    }

    if (editValue) {
      const updated = todoData.map((t) =>
        t.id === editValue.id
          ? {
              ...t,
              title: input.title,
              description: input.description,
              status: "pending",
            }
          : t,
      );

      setTodoData(updated);
      setEditValue(null);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        title: input.title,
        description: input.description,
        status: "pending",
      };
      setTodoData((prev) => [...prev, newTodo]);
    }
  };

  const edit = (id) => {
    const selected = todoData.find((t) => t.id === id);
    setEditValue(selected);
  };

  const deleteTodo = (id) => {
    const deleteTodo = todoData.filter((t) => t.id !== id);
    setTodoData(deleteTodo);
  };

  const statusEdit = (id) => {
    const updated = todoData.map((t) => {
      return t.id === id
        ? {
            ...t,
            status: t.status === "complete" ? "pending" : "complete",
          }
        : t;
    });

    setTodoData(updated);
  };

  return (
    <>
      <TodoForm addTodo={add} editValue={editValue} />
      <TodoList
        todo={todoData}
        deleteTodo={deleteTodo}
        edit={edit}
        statusEdit={statusEdit}
      />
    </>
  );
};

export default App;
