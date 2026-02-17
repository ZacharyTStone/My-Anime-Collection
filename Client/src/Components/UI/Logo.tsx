import logo from "../../assets/images/logo.svg";

interface LogoProps {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

const DEFAULT_LOGO_WIDTH = "100px";
const DEFAULT_LOGO_HEIGHT = "auto";

const Logo: React.FC<LogoProps> = ({ width, height, className, onClick }) => {
  return (
    <img
      src={logo}
      alt="My Anime Collection"
      className={`block mx-auto transition-transform duration-300 hover:scale-105 ${className || ""}`}
      style={{
        width: width || DEFAULT_LOGO_WIDTH,
        height: height || DEFAULT_LOGO_HEIGHT,
      }}
      onClick={onClick}
      role={onClick ? "button" : "img"}
      tabIndex={onClick ? 0 : undefined}
    />
  );
};

export default Logo;
