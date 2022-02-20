import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <Button>
            <NavLink
              to={path}
              key={id}
              className={({ isActive }) =>
                isActive ? "nav-link " : "nav-link"
              }
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          </Button>
        );
      })}
    </div>
  );
};

export default NavLinks;
