import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectedMenu } from "./layouts/sidebarLeft";


export default function ProtectedRoute ({ children, isLoggedIn }: { children: JSX.Element, isLoggedIn: boolean }) {
	const location = useLocation();
	const selected = React.useMemo(() => selectedMenu(location), [location]);

	useEffect(() => {
		document.title = `${selected} - Tvds`;
	}, [isLoggedIn, selected]);

	return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
