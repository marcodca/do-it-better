import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, CREATE_USER } from "../../queries";
import { Link } from "react-router-dom";

const Home = () => {

  const [createUser] = useMutation(CREATE_USER)
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };
  const handleFormSubmit = (e) => {
      e.preventDefault();
      createUser({variables: {name : inputValue}});
      setInputValue("");
      refetch();
  }

  const { data, loading, refetch  } = useQuery(GET_USERS);
  if (!data) {
    return null;
  }

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      {" "}
      {data.users.map(user => (
        <div>
          <Link to={`/user/${user.id}`}>
            <h3>{user.name}</h3>
          </Link>
        </div>
      ))}
      <h5>Create new user</h5>
      <form
        onSubmit={handleFormSubmit}
      >
        <input type={"text"} value={inputValue} onChange={handleInputChange} />
        <button>Create new user</button>
      </form>
    </div>
  );
};

export default Home;
