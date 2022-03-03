import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { GoTools } from "react-icons/go";

// will be mapped to the routes in App.js and nav links in NavLinks.js

const links = [
  {
    id: 2,
    text: "My Anime Collection",
    path: "my-animes",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "Add Anime",
    path: "add-anime",
    icon: <FaWpforms />,
  },
];

export default links;
