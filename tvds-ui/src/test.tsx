import { client } from "./utils/tsRest";
import React from "react";

export const Index = () => {
	const normal =  client.getUsers.query({
		query: { take: 10, skip: 0, search: "" },
		params: {}
	});
	console.log("Normal Fetch",normal);
	
	const { data, isLoading, error } = client.getUser.useQuery(["user"], { params: { name: "Sakthivel" } });
	// console.log("User",user);

	const users = client.getUsers.useQuery(["users"], {
		query: { take: 10, skip: 0, search: "" },
		params: {}
	});
	console.log("users", users);

	const user = client.createUser.useMutation();
	user.mutate({
		body: {name:"Vigneshwaran",password:"Vigneshwaran",isActive:true,passwordChangeAt:new Date("2023-07-12")},
		params: {}
	});

	// const { data, isLoading, error } = client.greetMessage.useQuery(["greeting"], { params: {} });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (data?.status !== 200 || error) {
		return <div>Error</div>;
	}

	return <div><p>{JSON.stringify(data.body)}</p><p>{data.body.name}</p><p>{data.body.createdAt}</p><p>{JSON.stringify(data.body.isActive)}</p><p>{data.body.modifiedAt}</p></div>;
};