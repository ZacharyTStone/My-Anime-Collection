import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";

// will be mapped to the routes in App.js and nav links in NavLinks.js

const links = [
  {
    id: 1,
    text: "My Anime Collection",
    path: "my-animes",
    icon: <MdQueryStats />,
  },
  {
    id: 2,
    text: "Add Anime",
    path: "add-anime",
    icon: <FaWpforms />,
  },
];

export default links;
