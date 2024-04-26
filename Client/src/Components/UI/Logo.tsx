import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
const Logo = () => {
  return <MacLogo src={logo} alt="My Anime Collection" />;
};

const MacLogo = styled.img`
  width: 100px;
  margin: 0 auto;
  display: block;
`;

export default Logo;
