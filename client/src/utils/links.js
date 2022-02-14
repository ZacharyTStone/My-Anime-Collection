import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { GoTools } from "react-icons/go";

// will be mapped to the routes in App.js and nav links in NavLinks.js

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "tools",
    path: "tools",
    icon: <GoTools />,
  },

  {
    id: 5,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
