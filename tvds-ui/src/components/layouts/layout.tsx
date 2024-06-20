import React from "react";
import Content from "./content";
import Header from "./header";
import {MouseEventHandler, useState} from "react";
import SidebarLeft from "./sidebarLeft";

export default function Layout () {
	const [showMenu, setShowMenu] = useState<boolean>(true);

	const handleChange:MouseEventHandler=()=>{
		setShowMenu(!showMenu);
	};

	return (
		<div className="flex h-[100vh]">
			{showMenu ? <SidebarLeft/> : null}
			<div className="w-full">
				<Header hide={handleChange} />
				<div className="grid grid-cols-[minmax(0,_1fr)] h-[80vh]">
					<Content />
				</div>
			</div>
		</div>
	);
}
