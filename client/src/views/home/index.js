import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries";
import Loading from "../../shared-components/Loading";
import UserInput from "./UserInput";
import styled from "styled-components";

const Home = ({ history }) => {
  //Note: This component is not using subscriptions, but refetch instead, meaning this, that if a new user is added, the update wont happen in real time in other window.
  const { data, loading, refetch } = useQuery(GET_USERS);

  if (loading) return <Loading/>  

  const Container = styled.div`
    min-height: 100vh;
    background: rgb(240, 175, 58);
    background: radial-gradient(
      circle,
      rgba(240, 175, 58, 1) 0%,
      rgba(219, 145, 13, 1) 100%
    );
  `;
  
  return (
    <Container>
        <UserInput users={data.users} refetch={refetch} history={history} />
    </Container>
  );
};

export default Home;
