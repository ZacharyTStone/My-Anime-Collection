import { FormRow, FormRowSelect, Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import React, { useState } from "react";
import AnimeContainer from "../../Components/AnimeContainer";

const AddJob = () => {
  const [textInput, setTextInput] = useState("");

  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }

    // createJob();
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTextInput(value);
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* title */}
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleJobInput}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block btn-submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block btn-hipster"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
                setTextInput("");
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
      <AnimeContainer searchText={textInput} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btn-hipster {
    opacity: 0.7;
  }
  .btn:hover {
    /* opacity: 1; */
    transform: scale(1.1);
  }
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 1rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-700);
  }
  .clear-btn:hover {
    background: var(--red-dark);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 20px;
    }
  }
`;

export default AddJob;
