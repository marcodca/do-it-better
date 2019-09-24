import React, { useState } from "react";
import { CREATE_USER } from "../../queries";
import { useMutation } from "@apollo/react-hooks";

const Input = ({ users, refetch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = e => {
    let { value } = e.target;
    value = value.toLowerCase().trim();
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

  const handleFormSubmit = e => {
    e.preventDefault();
    createUser({ variables: { name: inputValue } });
    setInputValue("");
    refetch();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <input type={"text"} value={inputValue} onChange={handleInputChange} />
      <ul>
        {suggestions.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {inputValue.length >= 3 && suggestions.length === 0 && (
        <button>Create new user</button>
      )}
    </form>
  );
};

export default Input;
