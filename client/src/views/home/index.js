import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from '../../queries';


const Home = () => {
    const { data, loading } = useQuery(GET_USERS);
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
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    );
}

export default Home