import { FormRow, FormRowSelect, Alert } from "../../Components";
import FormRowArea from "../../Components/FormRowArea";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";

const AddJob = () => {
  const [starState, setStarState] = useState(false);

  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    notes,
    stared,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <FormRowArea
            name="notes"
            labelText="notes"
            value={notes}
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
              }}
            >
              clear
            </button>
          </div>
          <div className="star">
            <FaStar
              color={stared === "false" ? "gray" : "gold"}
              value={stared}
              size={30}
              style={{
                marginTop: "20px",
              }}
              name="stared"
              onClick={() => {
                handleChange({
                  name: "stared",
                  value: stared === "true" ? "false" : "true",
                });
              }}
            />
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .star {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    /* padding-top: 20px; */
    width: 100%;

    h5 {
      margin-bottom: 0px;
    }
  }
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
