import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  notes,
  stared,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <div className="job">
        <header>
          <div className="main-icon">{company.charAt(0)}</div>

          <div className="info">
            <h5>
              {position}
              {stared === "true" ? (
                <FaStar color="gold" size={18} style={{ paddingTop: "5px" }} />
              ) : null}{" "}
            </h5>
            <p>{company}</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
            <JobInfo icon={<FaCalendarAlt />} text={date} />
            <JobInfo icon={<FaBriefcase />} text={jobType} />
            <div
              style={{
                marginTop: "10px",
              }}
            >
              Job Status : <span className={`status ${status}`}>{status}</span>
            </div>
            <div className="notes">
              <p>{notes}</p>
            </div>
          </div>
          <footer>
            <div className="actions">
              <Link
                to="/add-job"
                className="btn edit-btn"
                onClick={() => setEditJob(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteJob(_id)}
              >
                Delete
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  .job {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .notes {
    padding: 1rem;
    border-top: 1px solid var(--light-gray);
    width: 100%;
    display: flex;
    height: auto;
    flex-wrap: wrap;
  }

  p {
    word-break: break-all;
    white-space: normal;
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }

  .stared {
    background: "white";
  }

  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: var(--yellow-light);
    color: var(--yellow);
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Job;
