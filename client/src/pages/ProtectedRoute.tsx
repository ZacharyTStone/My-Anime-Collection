import { useAppContext } from "../context/appContext";
import { Navigate, useNavigate, useEffect } from "react-router-dom";

// not sure what the type for any React component is
const ProtectedRoute = ({ children }: any) => {
	

	const navigate = useNavigate()
	const { user } = useAppContext();


	 useEffect(() => {
		if (user &&  window.location.pathname === "/") {
			console.log("navigating to my animes")
			return <Navigate to="/my-animes" />;
		}

	 }, [user] );

	if (!user) {
		return <Navigate to="/landing" />;
	}
	return children;
};

export default ProtectedRoute;
