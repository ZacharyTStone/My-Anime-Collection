import logo from "../../assets/images/logo.svg";
import styled from "styled-components";
const Logo = () => {
  return <MacLogo src={logo} alt="My Anime Collection" />;
};

const MacLogo = styled.img`
  width: 100px;
  margin: 0 auto;
  display: block;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

export default Logo;
