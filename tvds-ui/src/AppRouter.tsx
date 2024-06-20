import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useMemo } from "react";
import {
	createBrowserRouter,
	NonIndexRouteObject,
	RouterProvider,
} from "react-router-dom";
import Content from "./components/layouts/content";
import Layout from "./components/layouts/layout";
import Login from "./components/pages/login";
import { userSessionAtom } from "./store/userSession";
import { Index as Test } from "./test";
import { App, theme } from "antd";
import ProtectedRoute from "./components/protectedRoute";
import { Loading } from "./components/common/error";

export default function AppRouter() {
	const [userSession] = useAtom(userSessionAtom);
	const isLoggedIn = useMemo(() => userSession !== null, [userSession]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	const routesList: NonIndexRouteObject[] = [
		{
			path: "/",
			element: <ProtectedRoute isLoggedIn={isLoggedIn}><Layout /></ProtectedRoute>,
			children : [
				// { path: "/dashboard", element: <Content /> },
				{ path: "/detection", index: true, element: <Content /> },
				{ path: "/challan", element: <Content /> },
				{ path: "/vehicles",element: <Content /> },
				{ path: "/maintenance", element: <Content /> },
				{ path: "/video-source", element: <Content /> },
				{ path: "/users", element: <Content /> },
				{ path: "/profile", element: <Content /> },
			]
		},
		{ path: "/test", element: <Test /> },
		{ path: "/login", element: <Login /> },
	];

	const router = createBrowserRouter(routesList);
	const { token } = theme.useToken();

	if(loading) {
		return <Loading />;
	}


	return(
		<App style={{
			backgroundColor: token.colorBgContainer,
			transition: "background 0.5s cubic-bezier(0.2, 0, 0, 1) 0s"
		}}>
			<RouterProvider router={router} />
		</App>
	);
}
