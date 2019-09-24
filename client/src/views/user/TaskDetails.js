import React from "react";
import { useMutation, useSubscription} from "@apollo/react-hooks";
import { DELETE_TASK } from "../../queries";
import { TOGGLE_TASK_COMPLETED } from "../../queries";
import { SUBSCRIBE_TASK_COMPLETED_TOGGLED } from '../../queries';

const TaskDetails = ({ id, title, userId, completed, created }) => {
  
  //mutations  
  const [deleteTask, { data }] = useMutation(DELETE_TASK, {
    variables: { id }
  });
  const [toggleTaskCompleted] = useMutation(TOGGLE_TASK_COMPLETED, {
    variables: { id }
  });

  //subscription
  const { data : subscribedData } = useSubscription(SUBSCRIBE_TASK_COMPLETED_TOGGLED, {
      variables : {id}
  })

  const latestCompleted = subscribedData ?  subscribedData.taskCompletedToggled.completed : completed

  console.log(subscribedData)

  return (
    <div>
      <p>Title: {title}</p>
      <p>Completed: {String(latestCompleted)}</p>
      <p>Created: {created}</p>
      <p onClick={
          ()=>{
            toggleTaskCompleted()
          }
      }><b>Mark as done</b></p>
      <button
        onClick={() => {
          deleteTask();
        }}
      >
        delete task
      </button>
    </div>
  );
};

export default TaskDetails;
