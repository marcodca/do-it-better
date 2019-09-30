import React, { useEffect, useState } from "react";
import TaskDetails from "./TaskDetails";
import CreateTaskForm from "./CreateTaskForm";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_TASKS, SUBSCRIBE_TO_USER_TASKS } from "../../queries";
import styled from "styled-components/macro";
import Loading from "../../shared-components/Loading";

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
  const { loading, error, data, subscribeToMore, refetch } = useQuery(GET_USER_TASKS, {
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

  if (loading) return <Loading />;
  if (error) return `Error! ${error}`;

  const userTasks = (() => {
    const { tasks } = data.user;

    switch (tasksToShow) {
      case "only not completed":
        return tasks.filter(task => !task.completed);
      case "oldest first":
        return tasks.sort((current, next) => current.created - next.created);
      case "newest first":
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
          <p>
            Total tasks:
            <span>{data.user.tasks.length}</span>
          </p>
          <p>
            Completed tasks:
            <span>{data.user.tasks.filter(task => task.completed).length}</span>
          </p>
        </Info>
        <Actions>
          <div>
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
          </div>
          <CreateTaskForm userId={id} />
        </Actions>
      </TopBar>
      {
        userTasks.length <= 0 &&
          <p css={`
            font-size: 20px;
            opacity: 0.7;
          `}>No tasks yet.</p> 
      }
      {userTasks.map(task => {
        const { id, title, completed, created } = task;
        return (
          <TaskDetails
            key={id}
            id={id}
            title={title}
            completed={completed}
            created={created}
            refetch={refetch}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  min-height: 90vh;
  margin-top: 10vh;
  background: rgb(240, 175, 58);
  background: radial-gradient(
    circle,
    rgba(240, 175, 58, 1) 0%,
    rgba(219, 145, 13, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TopBar = styled.div`
  border-radius: 5px;
  font-size: 20px;
  margin: 15px;
  width: 50%;
  min-width: 685px;
  background-color: rgba(256, 256, 256, 0.1);
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 2%;
  h1 {
    text-transform: capitalize;
    font-size: 48px;
    color: #fff;
    background: #000;
    padding: 3px;
  }
  p {
    font-size: 25px;
  }
  span {
    color: #fff;
    background: #000;
    padding: 0px 8px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
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
