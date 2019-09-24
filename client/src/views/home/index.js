import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries";
import { Link } from "react-router-dom";
import UserInput from "./UserInput";
import styled from 'styled-components';

const Home = () => {
  const { data, loading, refetch } = useQuery(GET_USERS);

  const Container = styled.div`
     height: 100vh;
     background: linear-gradient(0deg, rgba(230,178,35,1) 0%, rgba(255,141,10,1) 100%);
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
