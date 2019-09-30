import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK } from "../../queries";
import styled from "styled-components/macro";

const CreateFormTask = ({ userId }) => {
  const [titleInput, setTitleInput] = useState("");
  const [createTask] = useMutation(CREATE_TASK);

  const handleTitleInputChange = e => {
    let {value} = e.target;
    value = value.length <= 25 ? value : value.substring(0, 25); 
    setTitleInput(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    createTask({ variables: { title: titleInput, userId } });
    setTitleInput("");
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        css={`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        `}
      >
        <label>Create new task:</label>
        <CreateTaskInput
          type="text"
          value={titleInput}
          onChange={handleTitleInputChange}
        />
        <Button
          disabled={titleInput.length <= 3}
        >Create</Button>
      </form>
    </>
  );
};

const CreateTaskInput = styled.input`
  background-color: #eab84b;
  border: 0;
  font-family: "Catamaran", sans-serif;
  border: 0;
`;

const Button = styled.button`
background-color: #d3a237;
border: 1px solid grey;
padding: 5px;
border-radius: 5px;
text-transform: uppercase;
font-weight: bolder;
font-size: 18px;
`
export default CreateFormTask;
