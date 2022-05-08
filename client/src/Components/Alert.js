import { useAppContext } from "../context/appContext";

// this is to use to alert text in a component. it is only used for authentication
const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
