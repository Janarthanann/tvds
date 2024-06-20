import React from "react";
import { MdFormatListBulleted,MdPeopleAlt, MdOutlinePhotoCamera, MdDashboard } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu;

export enum MenuKey {
//   DASHBOARD = "Dashboard",
  DETECTION = "Detection",
  VEHICLES = "Vehicles",
//   CHALLAN = "Challan",
  SYSTEM = "System",
  VIDEO = "Video",
  USERS = "Users",
  TEST = "Test"
}

export const selectedMenu = (location: Location) => {
	const path = location.pathname;
	switch (path) {
	// case "/dashboard":
	// 	return MenuKey.DASHBOARD;
	case "/detection":
		return MenuKey.DETECTION;
	case "/vehicles":
		return MenuKey.VEHICLES;
	// case "/challan":
	// 	return MenuKey.CHALLAN;
	case "/maintenance":
		return MenuKey.SYSTEM;
	case "/video-source":
		return MenuKey.VIDEO;
	case "/users":
		return MenuKey.USERS;
	default:
		return MenuKey.DETECTION;
	}
};

export default function ErpMenu() {
	const navigate = useNavigate();
	const location = useLocation();
	const selected = React.useMemo(() => selectedMenu(location), [location]);

	return (
		<div className="w-48 h-full overflow-y-auto">
			<Menu mode="inline" selectedKeys={[selected]} style={{ minHeight: "100%" }}>
				{/* <Menu.Item key={MenuKey.DASHBOARD} onClick={() => navigate("/dashboard")}>
					<MdDashboard /> Dashboard
				</Menu.Item> */}
				<Menu.Item key={MenuKey.DETECTION} onClick={() => navigate("/detection")}>
					<MdOutlinePhotoCamera /> Detection
				</Menu.Item>
				{/* <Menu.Item key={MenuKey.CHALLAN} onClick={() => navigate("/challan")}>
					<BsFileEarmarkTextFill /> Challan
				</Menu.Item> */}
				<Menu.Item key={MenuKey.VEHICLES} onClick={() => navigate("/vehicles")}>
					<FaCarSide /> Vehicles
				</Menu.Item>
				<Menu.Item key={MenuKey.SYSTEM} onClick={() => navigate("/maintenance")}>
					<AiOutlineLineChart /> System
				</Menu.Item>
				<Menu.Item key={MenuKey.VIDEO} onClick={() => navigate("/video-source")}>
					<MdFormatListBulleted /> Video Source
				</Menu.Item>
				<Menu.Item key={MenuKey.USERS} onClick={() => navigate("/users")}>
					<MdPeopleAlt /> Users
				</Menu.Item>
				{/* <SubMenu key="test" icon={<FaCarSide />} title="Test">
					<Menu.Item key={MenuKey.CHALLAN} onClick={() => navigate("/challan")}>
						<BsFileEarmarkTextFill /> Challan
					</Menu.Item>
				</SubMenu> */}
			</Menu>
		</div>
	);
}
