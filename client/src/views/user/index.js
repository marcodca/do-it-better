import React, { useEffect } from "react";
import TaskDetails from "./TaskDetails";
import CreateTaskForm from "./CreateTaskForm";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_TASKS, SUBSCRIBE_TO_USER_TASKS } from "../../queries";

const User = props => {
  const { id } = props.match.params;

  const { loading, error, data, subscribeToMore } = useQuery(GET_USER_TASKS, {
    variables: { id }
  });

  useEffect(() => {
    subscribeToMore(
      {
        document: SUBSCRIBE_TO_USER_TASKS,
        variables: { id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newTasks = subscriptionData.data.userTasksAddedOrDeleted;
          return { user: { ...prev.user, tasks: newTasks } };
        }
      },
      []
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      {data.user.tasks.map(task => {
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
      <CreateTaskForm userId={id} />
    </div>
  );
};

export default User;
