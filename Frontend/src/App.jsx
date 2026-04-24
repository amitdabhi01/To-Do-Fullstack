import React, { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todoData, setTodoData] = useState([]);

  const [editValue, setEditValue] = useState(null);

  const BASE_URL = import.meta.env;

  const fetchedTodo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/todo/getAll`);
      setTodoData(res.data.todos || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchedTodo();
  }, []);

  const add = async (inputData) => {
    try {
      await axios.post(`${BASE_URL}/todo/create`, { inputData });
      setEditValue(null);
      fetchedTodo();
    } catch (error) {
      console.error(error.message);
    }
  };

  const edit = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/todo/edit/${id}`);
      setEditValue(null);
      fetchedTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todo/delete/${id}`);
      fetchedTodo();
    } catch (error) {
      console.error(error.message);
    }
  };

  const statusEdit = async (id) => {
    try {
      const todo = todoData.find((t) => t._id == id);

      const newStatus = todo.status === "complete" ? "pending" : "complete";

      await axios.patch(`${BASE_URL}/todo/update/${id}`, { status: newStatus });
      fetchedTodo();
    } catch (error) {
      console.error(error.message);
    }
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
