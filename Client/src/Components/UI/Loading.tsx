import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = ({ center = true }: { center?: boolean }) => {
  const LoadingDiv = styled.div<{ center: boolean }>`
    width: 6rem;
    height: 6rem;
    border: 5px solid var(--grey-400);
    border-radius: 50%;
    border-top-color: var(--primary-500);
    animation: ${spin} 2s linear infinite;
    ${(props) => props.center && "margin: 0 auto;"}
  `;

  return <LoadingDiv center={center}></LoadingDiv>;
};

export default Loading;
