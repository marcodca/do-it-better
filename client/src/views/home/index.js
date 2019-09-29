import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries";
import UserInput from "./UserInput";
import styled from "styled-components";

const Home = () => {
  //Note: This component is not using subscriptions, but refetch instead, meaning this, that if a new user is added, the update wont happen in real time in other window.
  const { data, refetch } = useQuery(GET_USERS);

  const Container = styled.div`
    min-height: 100vh;
    background: rgb(240, 175, 58);
    background: radial-gradient(
      circle,
      rgba(240, 175, 58, 1) 0%,
      rgba(219, 145, 13, 1) 100%
    );
  `;

  if (!data) {
    return null;
  }

  return (
    <Container>
      <UserInput users={data.users} refetch={refetch} />
    </Container>
  );
};

export default Home;
