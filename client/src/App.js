import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USERS = gql`
  query {
    users {
      id
      name
      tasks {
        id
        title
        userId
        completed
        created
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(GET_USERS);
  if (!data) {
    return null;
  }

  console.log(data)

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      {" "}
      {data.users.map(user => (
        <div>
          <h3>{user.name}</h3>
          <h4>Tasks</h4>
          <ul>
            {user.tasks.map(task => (
              <li>{task.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
