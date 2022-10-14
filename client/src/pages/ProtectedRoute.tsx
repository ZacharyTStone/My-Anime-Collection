import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

// not sure what the type for any React component is
const ProtectedRoute = ({ children }: any) => {
	const { user } = useAppContext();
	if (!user) {
		return <Navigate to="/landing" />;
	}

	if (user &&  window.location.pathname === "/") {
		console.log("navigating to my animes")
		return <Navigate to="/my-animes"/>;
	}
	return children;
};

export default ProtectedRoute;
