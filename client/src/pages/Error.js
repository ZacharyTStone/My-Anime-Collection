import { Link } from "react-router-dom";
import img from "../assets/images/allanime.webp";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div className="error-div">
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/my-animes">back home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  // darken image
  background-color: rgba(0, 0, 0, 0.5);
  .error-div {
    background-color: var(--white);
    padding: 2rem;
    opacity: 0.9;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Error;
