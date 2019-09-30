import React, { useEffect, useState } from "react";
import TaskDetails from "./TaskDetails";
import CreateTaskForm from "./CreateTaskForm";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_TASKS, SUBSCRIBE_TO_USER_TASKS } from "../../queries";
import styled from "styled-components";

const selectShowInputOptions = [
  "all",
  "only not completed",
  "newest first",
  "oldest first",
  "only completed"
];

const User = props => {
  const { id } = props.match.params;

  //The re-fetching in this component is made with the subscribeToMore of the useQuery api. It is triggered when the useEffect runs after the component is mounted.
  const { loading, error, data, subscribeToMore } = useQuery(GET_USER_TASKS, {
    variables: { id }
  });

  const [tasksToShow, setTasksToShow] = useState("all");

  useEffect(() => {
    subscribeToMore(
      {
        document: SUBSCRIBE_TO_USER_TASKS,
        variables: { id },
        updateQuery: (prev, { subscriptionData }) => {
          //if the subscription didn't came with any data, return the previous one.
          if (!subscriptionData.data) return prev;
          //The data return by the updateQuery has to have the exact same shape than the one originally returned by the query, so let's make an object that respects that shape.
          const newTasks = subscriptionData.data.userTasksAddedOrDeleted;
          return { user: { ...prev.user, tasks: newTasks } };
        }
      },
      []
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  const userTasks = (() => {
    const { tasks } = data.user;

    switch (tasksToShow) {
      case "only not completed":
        return tasks.filter(task => !task.completed);
      case "newest first":
        return tasks.sort((current, next) => current.created - next.created);
      case "oldest first":
        return tasks.sort((current, next) => next.created - current.created);
      case "only completed":
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  })();

  return (
    <Container>
      <TopBar>
        <Info>
          <h1>{data.user.name}</h1>
        </Info>
        <Actions>
          <label>Show:</label>
          <SelectShowTasks
            onChange={e => {
              setTasksToShow(e.target.value);
            }}
          >
            {selectShowInputOptions.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </SelectShowTasks>
          <CreateTaskForm userId={id} />
        </Actions>
      </TopBar>
      {userTasks.map(task => {
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
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: rgb(240, 175, 58);
  background: radial-gradient(
    circle,
    rgba(240, 175, 58, 1) 0%,
    rgba(219, 145, 13, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const TopBar = styled.div`
  border: 2px solid #000;
  border-radius: 5px;
  font-size: 20px;
  width: 50%;
  background-color: rgba(256, 256, 256, 0.1);
`;

const Info = styled.div`
  width: 100%;
  display: flexbox;
  justify-content: space-around;
  padding: 2%;
`;

const Actions = styled.div`
  display: flexbox;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 2%;
`;

const SelectShowTasks = styled.select`
  background-color: #eab84b;
  border: 0;
  text-transform: uppercase;
  text-align: center;
  font-family: "Catamaran", sans-serif;
  border: 0;
  &:active {
    border: 0;
    outline-color: transparent;
  }
`;

export default User;
