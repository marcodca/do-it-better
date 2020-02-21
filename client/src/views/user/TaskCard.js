import React from "react";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { DELETE_TASK } from "../../queries";
import { TOGGLE_TASK_COMPLETED } from "../../queries";
import { SUBSCRIBE_TASK_COMPLETED_TOGGLED } from "../../queries";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

//animation
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 40,
  (x - window.innerWidth / 2) / 40,
  1.05
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const TaskCard = ({ id, title, completed, created, refetch }) => {
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

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));

  return (
    <Container
      isCompleted={latestCompleted}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    >
      <h3>{title}</h3>
      <p>{latestCompleted ? "Completed" : "Not completed"}</p>
      <p>Created: {new Date(Number(created)).toLocaleString()}</p>
      <div>
        <button
          onClick={async () => {
            await toggleTaskCompleted();
            refetch();
          }}
        >
          Mark as {latestCompleted ? "done" : "not done"}
        </button>
        <button
          onClick={async () => {
            deleteTask();
            refetch();
          }}
        >
          Delete task
        </button>
      </div>
    </Container>
  );
};

const Container = styled(animated.div)`
  width: 90%;
  max-width: 400px;
  height: 150px;
  background: ${props =>
    props.isCompleted ? "rgba(96, 196, 128, 0.6)" : "rgb(255 255 255 / 0.6)"};
  margin: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
  box-shadow: 0px 3px 0px 1px rgb(0 0 0 / .3), 1px 11px 9px 2px rgba(0, 0, 0, 0.3);
  h3 {
    font-size: 30px;
    text-transform: capitalize;
  }
  > div {
    align-self: center;
    button {
      appearance: none;
      padding: 5px;
      margin: 0 3px;
      font-family: inherit;
      border: 0;
      background: #989b37;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.5);
    }
  }
`;

export default TaskCard;
