import React from "react";
import { Button, Card, Col, Form, Input, Row, notification, theme } from "antd";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { userSessionAtom } from "../../store/userSession";
import { useEffect } from "react";

const { useToken } = theme;
export default function Login() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [userSession, setUserSession] = useAtom(userSessionAtom);
	const login = trpc.auth.login2.useMutation();
	const { token } = useToken();

	useEffect(() => {
		document.title = "Login - Tvds";

		if (login.data) {
			setUserSession(login.data);
		} else if (login.error) {
			notification.error({ message: "Login", description: `${login.error.shape?.message}`, placement: "topRight" });
		}
	}, [login.data, login.error, navigate, setUserSession]);

	useEffect(() => {
		if (userSession) {
			notification.success({ message: "Login", description: "Login Successful", placement: "topRight" });
			navigate("/");
		}
	}, [navigate, userSession]);

	return (
		<Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
			<Col flex="540px">
				<Card title="Welcome" bordered={false}>
					<Form
						className="mt-6"
						form={form}
						onFinish={(e: { username: string; password: string }) =>
							login.mutate(e)
						}
					>
						<Form.Item name="username" rules={[{ required: true }]}>
							<Input placeholder="Username" />
						</Form.Item>
						<Form.Item name="password" rules={[{ required: true }]}>
							<Input.Password placeholder="Password" />
						</Form.Item>
						<Button
							htmlType="submit"
							style={{ backgroundColor: token.colorPrimaryHover }}
							type="primary"
							block
						>SIGN IN</Button>
					</Form>
				</Card>
			</Col>
		</Row>
	);
}
