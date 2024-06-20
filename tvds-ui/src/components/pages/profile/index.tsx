import { Button, Collapse, Form, Input} from "antd";
import React, {useState} from "react";
import { rules } from "../../rules";
import { HiPencil, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
};

export default function Profile(){
	const {Panel}=Collapse;
	const [form] = Form.useForm();
	const [showDetail, setShowDetail]=useState(false);
	const [editPassword, setEditPassword]=useState(false);
	const [show, setShow]=useState(true);

	const header=(
		<div className="flex cursor-auto items-center">
			<div className="w-full flex justify-between" onClick={event => event.stopPropagation()}>Profile Details
				{showDetail ? (
					<div className="flex pr-2 gap-1">
						<Button size="small" className="cursor-pointer text-red-600 border-red-600" onClick={()=>setShowDetail(false)}>CANCEL</Button>
						<Button size="small" className="cursor-pointer text-gray-500 border-gray-500">SAVE</Button>
					</div>
				):(
					<Button size="small" className="cursor-pointer mr-2" onClick={()=>setShowDetail(true)}>EDIT DETAILS</Button>
				)}
			</div>
			{show ? (<HiChevronUp className="text-xl text-gray-500" onClick={()=>setShow(false)}/>):(<HiChevronDown className="text-xl text-gray-500" onClick={()=>setShow(true)} />)}
		</div>
	);
	const passwordHeader = (
		<div className="flex">
			<div className="w-full" onClick={event => event.stopPropagation()}>Password</div>
			{editPassword ? (<HiX className="text-lg text-gray-500" onClick={()=>setEditPassword(false)}/>):(<HiPencil className="text-lg text-gray-500" onClick={()=>setEditPassword(true)} />)}
		</div>
	);

	return(
		<div className="h-[calc(100vh-3.2rem)] overflow-y-auto overflow-x-hidden">
			<div className="grid lg:grid-cols-2 gap-2 border-none p-2 ">
				<div>
					<Collapse defaultActiveKey="1">
						<Panel showArrow={false} header={header} key="1">
							<Form form={form} {...layout}>
								<Form.Item label="UserName" name="userName">
									<Input />
								</Form.Item>
								<Form.Item label="ID" name="id">
									<Input  />
								</Form.Item>
								<Form.Item label="FirstName"  name="firstName"
									rules={[rules.required]}
								>
									<Input  />
								</Form.Item>
								<Form.Item label="LastName"  name="lastName"
									rules={[rules.required]}
								>
									<Input  />
								</Form.Item>
								<Form.Item label="Location"  name="location"
									rules={[rules.required]}
								>
									<Input  />
								</Form.Item>
								<Form.Item label="Created"  name="created">
									<Input  />
								</Form.Item>
								<Form.Item label="Modified"  name="modified">
									<Input  />
								</Form.Item>
							</Form>
						</Panel>
					</Collapse>
				</div>
				<div >
					<Collapse key="2">
						<Panel header="Permissions" key="2" className="permission-collapse">
							<div className="grid gap-3">
								<text>Permission related to admin.</text>
								<text>Permission related to demo.</text>
								<text>Permission related to maintenance.</text>
								<text>Permission for normal user.</text>
							</div>
						</Panel>
					</Collapse>
				</div>
				<Collapse key="3">
					<Panel showArrow={false} header={passwordHeader} key="3">
						<Form form={form} {...layout}>
							<Form.Item label="Current Password"  name="currentPassword"
								rules={[rules.required]}
							>
								<Input.Password  />
							</Form.Item>
							<Form.Item label="New Password"  name="newPassword"
								rules={[rules.required]}
							>
								<Input.Password  />
							</Form.Item>
							<Form.Item label="Confirm Password" name="confirmPassword"
								rules={[rules.required]}
							>
								<Input.Password />
							</Form.Item>
							<Button disabled size="small" className="flex ml-auto">CHANGE PASSWORD</Button>
						</Form>
					</Panel>
				</Collapse>
			</div>
		</div>
	);
}
