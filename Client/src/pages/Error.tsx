import { Link } from "react-router";
import img from "../assets/images/allanime.webp";
import styled from "styled-components";

// Types and Interfaces
interface ErrorProps {
  className?: string;
  title?: string;
  message?: string;
  homeLink?: string;
}

// Constants
const DEFAULT_TITLE = "Ohh! page not found";
const DEFAULT_MESSAGE = "We can't seem to find the page you're looking for";
const DEFAULT_HOME_LINK = "/my-animes";
const BACKGROUND_OPACITY = 0.5;
const CONTENT_OPACITY = 0.9;

// Styled Components
const ErrorMain = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, ${BACKGROUND_OPACITY});
`;

const ErrorContainer = styled.div`
  background-color: var(--white);
  padding: 2rem;
  opacity: ${CONTENT_OPACITY};
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-lg);
  max-width: 500px;
  margin: 0 1rem;
`;

const ErrorHeading = styled.h1`
  margin-bottom: 0.5rem;
  color: var(--grey-900);
  font-size: 1.75rem;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--grey-500);
  font-size: 1rem;
  line-height: 1.5;
`;

const HomeLink = styled(Link)`
  color: var(--primary-500);
  text-decoration: underline;
  text-transform: capitalize;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-600);
  }
`;

/**
 * Error component that displays a 404 page not found error
 */
const Error: React.FC<ErrorProps> = ({
  className,
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
  homeLink = DEFAULT_HOME_LINK,
}) => {
  return (
    <ErrorMain className={className}>
      <ErrorContainer className="full-page">
        <ErrorHeading>{title}</ErrorHeading>
        <ErrorMessage>{message}</ErrorMessage>
        <HomeLink to={homeLink}>back home</HomeLink>
      </ErrorContainer>
    </ErrorMain>
  );
};

export default Error;
