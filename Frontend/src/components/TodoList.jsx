import React from "react";

import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import { Container, Table, Button } from "react-bootstrap";

const TodoList = ({ todo, deleteTodo, edit, statusEdit }) => {
  return (
    <>
      <Container>
        <div className="w-75 border mx-auto rounded-4 p-3">
          <Table>
            <thead className="text-center">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {todo.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Data found
                  </td>
                </tr>
              ) : (
                todo.map((t) => {
                  return (
                    <tr key={t.id}>
                      <td>{t.title}</td>
                      <td>{t.description}</td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={t.status === "complete"}
                          onChange={() => {
                            statusEdit(t.id);
                          }}
                        />
                      </td>
                      <td>
                        <Button onClick={() => edit(t.id)}>
                          <FiEdit className="fs-5" />
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => deleteTodo(t.id)}>
                          <AiTwotoneDelete className="fs-5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default TodoList;
