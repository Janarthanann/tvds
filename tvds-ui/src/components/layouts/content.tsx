import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Detection from "../pages/detection/index";
import System from "../pages/system/index";
import VideoSource from "../pages/video/index";
import Users from "../pages/users/index";
import Vehicles from "../pages/vehicles/index";
import Dashboard from "../pages/dashboard";
import Challan from "../pages/challan/index";
import Profile from "../pages/profile";

const routeList = [
	// { id: 1, path: "/dashboard", element: <Dashboard /> },
	{ id: 2, path: "/detection", element: <Detection /> },
	{ id: 3, path: "/challan", element: <Challan /> },
	{ id: 4, path: "/vehicles", element: <Vehicles /> },
	{ id: 5, path: "/maintenance", element: <System /> },
	{ id: 6, path: "/video-source", element: <VideoSource /> },
	{ id: 7, path: "/users", element: <Users /> },
	{ id: 7, path: "/profile", element: <Profile /> },
];

export default function Content() {
	return (
		<Routes>
			<Route index element={<Navigate to="/detection" />} />
			{routeList.map((route) => (
				<Route path={route.path} element={route.element} key={route.id} />
			))}
		</Routes>

	);
}
