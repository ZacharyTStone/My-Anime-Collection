import { useAppContext } from "../context/appContext";
import { Navigate, redirect  } from "react-router-dom";
import React, { useEffect } from 'react';

// not sure what the type for any React component is
const ProtectedRoute = ({ children }: any) => {
	
	const { user } = useAppContext();


	 useEffect(() => {
		if (user &&  window.location.pathname === "/") {
			console.log("navigating to my animes")
			redirect("/my-animes")
		}

	 }, [user] );

	if (!user) {
		return <Navigate to="/landing" />;
	}
	return children;
};

export default ProtectedRoute;
