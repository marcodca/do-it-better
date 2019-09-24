import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from '../../queries';
import { Link } from 'react-router-dom';


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
            <Link to={`/user/${user.id}`}><h3>{user.name}</h3></Link>
          </div>
        ))}
      </div>
    );
}

export default Home