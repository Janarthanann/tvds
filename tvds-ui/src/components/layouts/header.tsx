import React from "react";
import { MdMenu } from "react-icons/md";
import { BsMoon, BsPersonFill, BsSun } from "react-icons/bs";
import { MdSettings,MdLogout } from "react-icons/md";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MouseEventHandler } from "react";
import { Button, Dropdown, Menu, notification, theme } from "antd";
import { useAtom } from "jotai";
import { userSessionAtom } from "../../store/userSession";
import { computedThemeAtom, selectedThemeAtom, ThemeType } from "../../store/theme";

export default function Header(props:{hide:MouseEventHandler}) {
	const [userSession, setUserSession] = useAtom(userSessionAtom);
	const { token } = theme.useToken();
	const navigate = useNavigate();
	const logout = async () => {
		setUserSession(null);
		navigate("/");
		notification.info({message: "Logged Out", description: "Your have been logged out successfully", placement: "topRight"});
	};

	const userMenu = (
		<Menu items={[
			{
				label: <div className="grid pr-6 cursor-auto">Logged in as <span className="font-[500]">{userSession?.user?.name}</span></div>,
				key: "1"
			},
			{
				type: "divider"
			},
			{
				label: <Link to="/profile" className="flex gap-2 items-center"><BsPersonFill className="text-xl text-gray-500"/>Profile</Link>,
				key: "2"
			},
			{
				label: <Link to="/" className="flex gap-2 items-center"><MdSettings className="text-xl text-gray-500"/>Settings</Link>,
				key: "3"
			},
			{
				label: <div className="flex gap-2 items-center" onClick={() => void logout()}><MdLogout className="text-xl text-gray-500"/>Logout</div>,
				key: "4"
			},
		]}
		/>
	);

	const [, setSelectedTheme] = useAtom(selectedThemeAtom);
	const [computedTheme] = useAtom(computedThemeAtom);

	return (
		<div style={{backgroundColor: token.colorPrimary}}>
			<div style={{backgroundColor: "#fff2"}} className="flex justify-between py-2 px-3 w-full">
				<div className="flex gap-2">
					<Button type="primary" onClick={props.hide} icon={<MdMenu className="text-2xl m-auto" />} />
					<div style={{color: "white"}} className="my-auto">
						<Routes>
							<Route path="/dashboard" element={"Dashboard - TVDS"} />
							<Route path="/detection" element={"Detection - TVDS"} />
							<Route path="/challan" element={"Challan - TVDS"} />
							<Route path="/vehicles" element={"Vehicles - TVDS"} />
							<Route path="/maintenance" element={"System Maintenance - TVDS"} />
							<Route path="/video-source" element={"Video Source - TVDS"} />
							<Route path="/users" element={"Users - TVDS"} />
						</Routes>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<Button type="primary" className="text-xl" onClick={() => setSelectedTheme(() => computedTheme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark)}>
						{computedTheme === ThemeType.Dark ? <BsMoon/> : <BsSun/>}
					</Button>

					<Button type="primary">
						<Dropdown overlay={userMenu} trigger={["click"]}>
							<BsPersonFill className="text-2xl" />
						</Dropdown>
					</Button>
				</div>
			</div>
		</div>
	);
}
