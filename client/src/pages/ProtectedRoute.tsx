import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

// not sure what the type for any React component is
const ProtectedRoute = ({ children }: any) => {
	const { user } = useAppContext();
	if (!user) {
		return <Navigate to="/landing" />;
	}
	return children;
};

export default ProtectedRoute;
