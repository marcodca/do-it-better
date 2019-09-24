import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries";
import { Link } from "react-router-dom";
import Input from "./Input";

const Home = () => {
  const { data, loading, refetch } = useQuery(GET_USERS);
  if (!data) {
    return null;
  }

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <Input users={data.users} refetch={refetch} />
    </div>
  );
};

export default Home;
