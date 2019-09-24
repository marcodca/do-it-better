import React from "react";
import TaskDetails from "./TaskDetails";
import CreateTaskForm from "./CreateTaskForm";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { GET_USER_TASKS, SUBSCRIBE_TO_USER_TASKS } from "../../queries";

const User = props => {
  const { id } = props.match.params;

  const { loading, error, data } = useQuery(GET_USER_TASKS, {
    variables: { id }
  });
  const { data: subscribedData } = useSubscription(SUBSCRIBE_TO_USER_TASKS, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  const tasks = subscribedData
    ? subscribedData.userTasksAddedOrDeleted
    : data.user.tasks;

  return (
    <div>
      {tasks.map(task => {
        const { id, title, completed, created } = task;
        return (
          <TaskDetails
            key={id}
            id={id}
            title={title}
            completed={completed}
            created={created}
          />
        );
      })}
      <CreateTaskForm userId={id}/>
    </div>
  );
};

export default User;
