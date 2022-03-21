import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";

const NavLinks = () => {
  return (
    <Wrapper>
      <div className="nav-links">
        {links.map((link) => {
          const { text, path, id, icon } = link;

          return (
            <Button>
              <NavLink
                to={path}
                key={id}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            </Button>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media (max-width: 768px) {
    .nav-links {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default NavLinks;
