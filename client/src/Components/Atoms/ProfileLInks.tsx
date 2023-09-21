import { ImProfile } from "react-icons/im";
import { GoTools } from "react-icons/go";

const ProfileLinks = () => {
  const links = [
    { id: 5, text: "profile", path: "profile", icon: <ImProfile /> },

    { id: 6, text: "logout", path: "logout", icon: <GoTools /> },
  ];
};

export default ProfileLinks;
