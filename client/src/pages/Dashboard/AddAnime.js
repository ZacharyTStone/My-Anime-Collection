import { FormRow, Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import React, { useState } from "react";
import AnimeContainer from "../../Components/AnimeContainer";

const AddAnime = () => {
  const [textInput, setTextInput] = useState("");

  const { showAlert } = useAppContext();

  const handleTextInput = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <Wrapper>
      <main className="content full-page">
        <form className="form">
          <h3>Add Anime</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            {/* title */}
            <FormRow
              type="text"
              name="title"
              value={textInput}
              handleChange={handleTextInput}
            />
          </div>
        </form>
        <AnimeContainer searchText={textInput} />
      </main>
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

export default AddAnime;
