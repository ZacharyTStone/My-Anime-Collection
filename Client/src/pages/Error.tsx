import { Link } from "react-router-dom";
import img from "../assets/images/allanime.webp";
import styled from "styled-components";

const Error = () => {
  return (
    <StyledMain>
      <StyledErrorDiv className="full-page">
        <StyledHeading>Ohh! page not found</StyledHeading>
        <StyledParagraph>
          We can't seem to find the page you're looking for
        </StyledParagraph>
        <StyledLink to="/my-animes">back home</StyledLink>
      </StyledErrorDiv>
    </StyledMain>
  );
};

const StyledMain = styled.main`
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
`;

const StyledErrorDiv = styled.div`
  background-color: var(--white);
  padding: 2rem;
  opacity: 0.9;
`;

const StyledHeading = styled.h3`
  margin-bottom: 0.5rem;
`;

const StyledParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--grey-500);
`;

const StyledLink = styled(Link)`
  color: var(--primary-500);
  text-decoration: underline;
  text-transform: capitalize;
`;

export default Error;
