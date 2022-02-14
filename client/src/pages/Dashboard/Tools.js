import { useAppContext } from "../../context/appContext";
import { Loading } from "../../Components";
import styled from "styled-components";
import { FormRow } from "../../Components";
import React, { useState, useEffect } from "react";
import { FormRowSelect } from "../../Components";
import Calculator from "../../Components/Calculator";

const Tools = () => {
  const { isLoading, jobs, getJobs, user } = useAppContext();
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currData, setCurrData] = useState([]);

  useEffect(() => {
    getJobs();
    console.log(jobs);
    fetch(
      "https://openexchangerates.org/api/latest.json?app_id=" +
        process.env.REACT_APP_RATE_API
    )
      .then((response) => response.json())
      .then((data) => {
        let array = [];
        for (let key in data.rates) {
          array.push(key);
        }
        setCurrencyOptions(array);
        setCurrData(data.rates);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <div className="tools">
        <div className="form">
          <h3>
            {error
              ? "Sorry! The free tier of the currency API I use has hit it's limit Please try again later."
              : "Currency Converter"}
          </h3>
          <form className="form-center">
            <FormRow
              type="number"
              labelText={
                salary === ""
                  ? "Salary"
                  : "Base Salary : " +
                    Number(salary).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
              }
              name="salary"
              value={salary}
              disabled={error}
              handleChange={(e) => {
                setSalary(e.target.value);
              }}
            />
            <FormRowSelect
              name="Base Currency"
              type="number"
              value={baseCurrency}
              handleChange={(e) => setBaseCurrency(e.target.value)}
              list={currencyOptions}
              disabled={true}
            />
            <FormRowSelect
              name="Target Currency"
              value={targetCurrency}
              handleChange={(e) => {
                setTargetCurrency(e.target.value);
              }}
              list={currencyOptions}
              disabled={error}
            />
            <FormRow
              name="Converted Salary"
              labelText="Converted Salary"
              value={(salary * currData[targetCurrency]).toLocaleString(
                undefined,
                {
                  style: "currency",
                  currency: targetCurrency,
                }
              )}
              disabled={true}
              disabled={error}
            />
          </form>
        </div>
        <div className="form usefulLinks">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="https://www.indeed.com/career/salaries" target="_blank">
                {" "}
                Indeed Salaries (US only){" "}
              </a>
            </li>
            <li>
              <a href="https://www.glassdoor.com" target="_blank">
                Glassdoor{" "}
              </a>
            </li>

            <li>
              <a
                href="https://www.indeed.com/career-advice/interviewing/questions-to-ask-yourself-before-a-job-interview"
                target="_blank"
              >
                5 Questions to Ask Yourself Before a Job Interview
              </a>
            </li>
          </ul>
        </div>
        <div className="form all-jobs">
          <h3>All Jobs</h3>
          <ol>
            {jobs.map((job) => {
              console.log(job);
              return (
                <li>
                  <span>
                    {job.position}:{job.company}
                  </span>
                  <span> | {job.jobLocation}</span>
                  <span> | {job.createdAt.slice(0, 10)}</span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="form calculator">
          <Calculator />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .calculator {
    height: 500px;
  }
  .all-jobs {
    user-select: all;
  }
  .tools {
    padding: 1rem;
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
    }
  }
`;

export default Tools;
