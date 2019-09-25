import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries";
import UserInput from "./UserInput";
import styled from 'styled-components';

const Home = () => {
  const { data, loading, refetch } = useQuery(GET_USERS);

  const Container = styled.div`
     height: 100vh;
     background: #F0AF3A;
  ` 

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
