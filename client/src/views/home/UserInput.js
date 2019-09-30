import React, { useState, useRef, useEffect } from "react";
import { CREATE_USER } from "../../queries";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const UserInput = ({ users, refetch, history }) => {
  //mutation
  const [createUser] = useMutation(CREATE_USER);

  //input
  const [inputValue, setInputValue] = useState("");

  //A ref for the input
  const ref = useRef();

  const handleInputChange = e => {
    let value = e.target.value.toLowerCase().trim();

    //limit the length 
    value = value.length >= 10 ? value.substring(0, 10) : value;
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

  //focus on the input (glitch was making it loose after each typing)
  useEffect(() => {
    ref.current.focus();
  });

  //state for storing user names suggestions giving the value of the input
  const [suggestions, setSuggestions] = useState([]);

  const createNewUser = async e => {
    e.preventDefault();
    const newUser = await createUser({ variables: { name: inputValue } });
    setInputValue("");
    refetch();
    history.push(`/user/${newUser.data.createUser.id}`);
  };

  const NumberUsers = users ? users.length : null;

  console.log(NumberUsers);

  return (
    <>
      <InputContainer>
        {NumberUsers && (
          <NumberUsersMsg>
            There are currently {NumberUsers} users created.{" "}
          </NumberUsersMsg>
        )}
        <Input
          type={"text"}
          value={inputValue}
          onChange={handleInputChange}
          ref={ref}
          placeholder={"Type to search user"}
        />

        <ResultsContainer>
          {!!suggestions.length && (
            <Ul>
              {suggestions.map(user => (
                <Link to={`/user/${user.id}`}>
                  <Li key={user.id}>{user.name}</Li>
                </Link>
              ))}
            </Ul>
          )}
          {inputValue.length >= 3 && suggestions.length === 0 && (
            <CreateNewUserMsj>
              There's no user {inputValue}.<br />
              <a onClick={createNewUser} href={"#"}>
                Click here to create new user.
              </a>
            </CreateNewUserMsj>
          )}
        </ResultsContainer>
      </InputContainer>
    </>
  );
};

//styled components
const InputContainer = styled.div`
  width: 100%;
  height: 80%;
  min-height: 500px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  top: 100px;
  min-height: 100px;
  width: 40%;
  min-width: 300px;
  font-size: 5rem;
  background-color: #eab84b;
  border: 0;
  text-transform: uppercase;
  text-align: center;
  justify-self: end;
  z-index: 1;
  box-shadow: 2px 3px 13px -2px rgba(0, 0, 0, 0.75);
  &:focus {
    border: 0;
    outline-color: transparent;
  }
  &::placeholder {
    color: #b07711;
    font-size: calc(26px + (50 - 26) * ((100vw - 300px) / (1440 - 320)));
    text-transform: initial;
  }
`;

const NumberUsersMsg = styled.p`
  display: inline-block;
  width: 30%;
  min-width: 200px;
  color: #fff;
  background-color: #000;
  position: absolute;
  top: 80px;
  padding: 2px;
  text-align: center;
`;

const ResultsContainer = styled.div`
  min-height: 340px;
  width: 40%;
  position: absolute;
  top: 190px;
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

const CreateNewUserMsj = styled.div`
  font-size: 25px;
  margin-top: 10%;
  line-height: 30px;
  a {
    display: inline-block;
    margin-top: 10px;
    color: #fff;
    background: #000;
    padding: 3px;
  }
`;

export default UserInput;
