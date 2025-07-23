import { useAppContext } from "../../context/appContext";
import styled from "styled-components";

// Types and Interfaces
interface AlertProps {
  className?: string;
}

// Styled Components
const AlertContainer = styled.div<{ alertType: string }>`
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  border-radius: var(--borderRadius);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;

  ${({ alertType }) => {
    switch (alertType) {
      case "danger":
        return `
          background-color: var(--red-light);
          color: var(--red-dark);
          border: 1px solid var(--red-light);
        `;
      case "success":
        return `
          background-color: var(--green-light);
          color: var(--green-dark);
          border: 1px solid var(--green-light);
        `;
      default:
        return `
          background-color: var(--yellow-light);
          color: var(--yellow-dark);
          border: 1px solid var(--yellow-light);
        `;
    }
  }}
`;

/**
 * Alert component that displays contextual feedback messages
 * Used primarily for authentication feedback
 */
const Alert: React.FC<AlertProps> = ({ className }) => {
  const { alertType, alertText, showAlert } = useAppContext();

  if (!showAlert || !alertText) {
    return null;
  }

  return (
    <AlertContainer
      alertType={alertType}
      className={className}
      role="alert"
      aria-live="polite"
    >
      {alertText}
    </AlertContainer>
  );
};

export default Alert;
