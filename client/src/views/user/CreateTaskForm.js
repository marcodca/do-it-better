import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK } from "../../queries";

const CreateFormTask = ({ userId }) => {
  const [titleInput, setTitleInput] = useState("");
  const [createTask] = useMutation(CREATE_TASK);

  const handleTitleInputChange = e => {
    setTitleInput(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    createTask({ variables: { title: titleInput, userId } });
    setTitleInput("");
  };

  return (
    <>
      <h5>Create new task:</h5>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={titleInput}
          onChange={handleTitleInputChange}
        />
        <button>Create</button>
      </form>
    </>
  );
};

export default CreateFormTask;
