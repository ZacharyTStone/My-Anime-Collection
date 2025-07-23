import styled from "styled-components";
import logo from "../../assets/images/logo.svg";

// Types and Interfaces
interface LogoProps {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

// Constants
const DEFAULT_LOGO_WIDTH = "100px";
const DEFAULT_LOGO_HEIGHT = "auto";

// Styled Components
const StyledLogo = styled.img<{ customWidth?: string; customHeight?: string }>`
  width: ${({ customWidth }) => customWidth || DEFAULT_LOGO_WIDTH};
  height: ${({ customHeight }) => customHeight || DEFAULT_LOGO_HEIGHT};
  margin: 0 auto;
  display: block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

/**
 * Logo component that displays the application logo
 */
const Logo: React.FC<LogoProps> = ({ width, height, className, onClick }) => {
  return (
    <StyledLogo
      src={logo}
      alt="My Anime Collection"
      customWidth={width}
      customHeight={height}
      className={className}
      onClick={onClick}
      role={onClick ? "button" : "img"}
      tabIndex={onClick ? 0 : undefined}
    />
  );
};

export default Logo;
