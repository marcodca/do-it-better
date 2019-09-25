import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries";
import UserInput from "./UserInput";
import styled from "styled-components";

const Home = () => {
  const { data, loading, refetch } = useQuery(GET_USERS);

  const Container = styled.div`
    height: 100vh;
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
  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <Container>
      <UserInput users={data.users} refetch={refetch} />
    </Container>
  );
};

export default Home;
