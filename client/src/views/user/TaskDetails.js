import React from "react";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { DELETE_TASK } from "../../queries";
import { TOGGLE_TASK_COMPLETED } from "../../queries";
import { SUBSCRIBE_TASK_COMPLETED_TOGGLED } from "../../queries";

const TaskDetails = ({ id, title, completed, created, refetch }) => {
  //This component is handling the subscriptions in a less elegant way: we use the useSubscription hook, and then conditionally rendering depending on if there's been an update in the relevant data

  //mutations
  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { id }
  });
  const [toggleTaskCompleted] = useMutation(TOGGLE_TASK_COMPLETED, {
    variables: { id }
  });

  //subscription
  const { data: subscribedData } = useSubscription(
    SUBSCRIBE_TASK_COMPLETED_TOGGLED,
    {
      variables: { id }
    }
  );

  //If a subscription has been published, us the latest value, otherwise keep using the value that is coming from the props.
  const latestCompleted = subscribedData
    ? subscribedData.taskCompletedToggled.completed
    : completed;

  return (
    <div>
      <p>Title: {title}</p>
      <p>Completed: {String(latestCompleted)}</p>
      <p>Created: {new Date(Number(created)).toLocaleString()}</p>
      <p
        onClick={async () => {
          await toggleTaskCompleted();
          refetch();
        }}
      >
        <b>Mark as done</b>
      </p>
      <button
        onClick={async () => {
          deleteTask();
          refetch();
        }}
      >
        delete task
      </button>
    </div>
  );
};

export default TaskDetails;
