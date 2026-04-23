import React from "react";

import { useState, useEffect } from "react";

import { Container, Form, Button } from "react-bootstrap";

const TodoForm = ({ addTodo, editValue }) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    editValue ? setInput(editValue) : null;
  }, [editValue]);

  const handleInput = (identifier, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [identifier]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input data", input);
    addTodo(input);
    setInput({ title: "", description: "", status: "pending" });
  };

  return (
    <>
      <Container className="my-5 rounded-3">
        <div className="border p-4 rounded-5 w-75 m-auto">
          <h1 className="text-center text-secondary text-decoration-underline mb-3">
            To Do Manager
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={input.title}
                onChange={(e) => handleInput("title", e)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title Description"
                value={input.description}
                onChange={(e) => handleInput("description", e)}
              />
            </Form.Group>
            <Button variant="success" className="w-100 py-2" type="submit">
              {editValue ? "Update" : "Add"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default TodoForm;
