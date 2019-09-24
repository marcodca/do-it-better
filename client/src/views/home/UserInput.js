import React, { useState, useRef, useEffect } from "react";
import { CREATE_USER } from "../../queries";
import { useMutation } from "@apollo/react-hooks";
import styled from 'styled-components';

const UserInput = ({ users, refetch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [createUser] = useMutation(CREATE_USER);

  const ref = useRef()

  const handleInputChange = e => {
    const value  = e.target.value.toLowerCase().trim();
    setInputValue(value);

    //Return if the input is empty
    if (!value.length) {
      setSuggestions([]);
      return;
    }
    //Clear the suggestions array from users that no longer match the value
    suggestions.forEach(suggestion => {
      if (!suggestion.name.includes(value)) {
        setSuggestions(prev => prev.filter(elem => elem.id !== suggestion.id));
      }
    });

    //Populate the suggestion array with matches
    users.forEach(user => {
      if (suggestions.includes(user)) return;
      if (user.name.includes(value)) {
        setSuggestions(prev => [...prev, user]);
      }
    });
  };

  const createNewUser = e => {
    e.preventDefault();
    createUser({ variables: { name: inputValue } });
    setInputValue("");
    refetch();
  };

  const Input = styled.input`
    min-height: 100px;
    width: 40%;
    min-width: 300px;
    font-size: 5rem;
    background-color: #eab84b;
    border: 0;
    text-transform: uppercase;
    &:focus {
      border: 0;
      outline-color: transparent;
    }
  `

  useEffect(()=>{
    ref.current.focus();
  })

  return (
    <>
      <Input type={"text"} value={inputValue} onChange={handleInputChange} ref={ref} />
      <ul>
        {suggestions.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {inputValue.length >= 3 && suggestions.length === 0 && (
        <div>
          There's no user {inputValue}.{" "}
          <a onClick={createNewUser} href={'#'}>Create new user.</a>
        </div>
      )}
    </>
  );
};

export default UserInput;
