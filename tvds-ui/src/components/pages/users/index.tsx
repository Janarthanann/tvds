import UserDetails from "./sidebarRight";
import React from "react";
import Table, { Columns, TableBar } from "../../table";
import { trpc } from "../../../utils/trpc";
import { Error, Loading } from "../../common/error";

interface Detail {
  key: React.Key;
  name: string;
  createdAt: string;
}

export default function Users() {
	const columns: Columns<Detail> = React.useMemo(
		() => [
			{
				title: "Username",
				field: "name",
				width: 100,
			},
			{
				title: "Createdat",
				field: "createdAt",
				width: 100,
			},
		],
		[]
	);

	const userList = trpc.user.getUsers.useQuery({ take: 3 });
	console.log(userList.data, "44");

	const mapUsers = React.useMemo(
		() =>
			userList.data?.map((item, index) => ({
				key: index,
				name: item?.name,
				createdAt: new Date(item.createdAt).toLocaleString(),
			})),
		[userList]
	);

	if(userList.isError){
		return <Error error={userList.error?.message} />;
	}

	if(userList.isLoading) {
		return <Loading />;
	}



	return (
		<div className="grid col-span-2 grid-cols-[minmax(0,_1fr)_23rem]">
			<div className="grid grid-cols-1">
				<TableBar name="Users">
					<Table
						height="calc(100vh - 9.1rem)"
						columns={columns}
						value={mapUsers}
					/>
				</TableBar>
			</div>
			{/* <UserDetails /> */}
		</div>
	);
}
