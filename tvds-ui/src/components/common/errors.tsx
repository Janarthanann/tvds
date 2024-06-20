import { notification } from "antd";

const ErrorMsg = ( err: { message?: string } ) => {
	notification.error({
		message: "Error",
		description: `Encountered an Error: ${err.message}`,
		placement: "topRight",
	});
};

export default ErrorMsg;
