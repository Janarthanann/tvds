import { Button, Form, Input, Radio, Select, theme } from "antd";
import React, {useState} from "react";
import { Option } from "antd/es/mentions";
import { rules } from "../../rules";


const {useToken} = theme;
export default function UserDetails(){
	const [form] = Form.useForm();
	const [createUser, setCreateUser]=useState(true);
	const [, setUserDetails]=useState();
	const {token}=useToken();
	const onFinish=(e:any)=>{
		console.log("value...", e);
		setUserDetails(e);
		setCreateUser(true);
		form.resetFields();
	};

	return(
		<div>
			<div className="px-2 h-[3.14rem] items-center flex justify-between">
				{createUser ? (
					<h4 className="gap-10">User Details</h4>
				):(
					<h4 className="gap-10">Create User</h4>
				)}
				<div className="flex gap-2 justify-center">
					<Button htmlType="submit">Create</Button>
					<Button onClick={()=>setCreateUser(true)}>Cancel</Button>
				</div>
			</div>
			<Form form={form} onFinish={onFinish} >
				<div className="h-[calc(100vh-6.1rem)] overflow-y-auto overflow-x-hidden" style={{borderStyle: token.lineType, borderTopWidth: token.lineWidth, borderColor: token.colorBorder}}>
					{createUser ? (
						<div className="grid justify-center gap-2 m-auto">
							<p>Selected a record to preview its details</p>
							<span className="m-auto">Or</span>
							<Button className="w-fit m-auto" onClick={()=>setCreateUser(false)}>Create new user</Button>
						</div>
					):(
						<div className="grid p-4">

							<Form.Item label="First name"  name="firstName"
								rules={[{ required: true, message: "FirstName is required" }]}
							>
								<Input placeholder="" size="small"/>
							</Form.Item>
							<Form.Item label="Last name"  name="lastName"
								rules={[rules.required]}
							>
								<Input placeholder="" size="small"/>
							</Form.Item>
							<Form.Item label="Location" name="location"
								rules={[rules.required]}
							>
								<Input placeholder="" size="small"/>
							</Form.Item>
							<Form.Item label="User name" name="userName"
								rules={[rules.required]}
							>
								<Input placeholder="" size="small"/>
							</Form.Item>
							<Form.Item label="Password" name="password"
								rules={[{required: true}]}
							>
								<Input.Password placeholder="" size="small"/>
							</Form.Item>
							<Form.Item label="User status" name="status"
								rules={[rules.required]}
							>
								<Radio.Group>
									<Radio value={"active"}>Active</Radio>
									<Radio value={"inactive"}>Inactive</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="Permissions" name="permissions"
								rules={[rules.required]}
							>
								<Select size="small" placeholder="Select any value">
									<Option value="maintainer">Maintainer</Option>
									<Option value="user">User</Option>
								</Select>
							</Form.Item>
						</div>
					)}
				</div>
			</Form>
		</div>
	);
}
