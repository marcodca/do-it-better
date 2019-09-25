import React, { useState, useRef, useEffect } from "react";
import { CREATE_USER } from "../../queries";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const UserInput = ({ users, refetch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [createUser] = useMutation(CREATE_USER);

  const ref = useRef();

  const handleInputChange = e => {
    const value = e.target.value.toLowerCase().trim();
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

  const InputContainer = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    position: relative;
  `;

  const Input = styled.input`
    min-height: 100px;
    width: 40%;
    min-width: 300px;
    font-size: 5rem;
    background-color: #eab84b;
    border: 0;
    text-transform: uppercase;
    text-align: center;
    justify-self: end;
    &:focus {
      border: 0;
      outline-color: transparent;
    }
    &::placeholder {
      font-size: 3rem;
      text-transform: initial;
    }
  `;

  const ResultsContainer = styled.div`
    min-height: 290px;
    width: 40%;
  `;

  const Ul = styled.ul`
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  `;

  const Li = styled.li`
    margin: 0 5%;
    padding: 5%;
    padding-top: 25%;
    background: #000;
    color: #f0af3a;
    font-size: 25px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    cursor: pointer;
  `;

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <>
      <InputContainer>
        <Input
          type={"text"}
          value={inputValue}
          onChange={handleInputChange}
          ref={ref}
          placeholder={"Type to search user"}
        />
        <ResultsContainer>
          { !!suggestions.length && (
            <Ul>
              {suggestions.map(user => (
                <Link to={`/user/${user.id}`}>
                  <Li key={user.id}>{user.name}</Li>
                </Link>
              ))}
            </Ul>
          )}
          {inputValue.length >= 3 && suggestions.length === 0 && (
            <div>
              There's no user {inputValue}.
              <a onClick={createNewUser} href={"#"}>
                Click here to create new user.
              </a>
            </div>
          )}
        </ResultsContainer>
      </InputContainer>
    </>
  );
};

export default UserInput;
