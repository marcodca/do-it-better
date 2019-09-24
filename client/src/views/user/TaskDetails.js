import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TASK } from "../../queries";

const TaskDetails = ({ id, title, userId, completed, created }) => {
  const [deleteTask, { data }] = useMutation(DELETE_TASK, {
    variables: { id }
  });
  
  return (
    <div>
      <p>Title: {title}</p>
      <p>Completed: {completed}</p>
      <p>Created: {created}</p>
      <button onClick={() => {
          deleteTask(id)
      }}>delete task</button>
    </div>
  );
};

export default TaskDetails;
