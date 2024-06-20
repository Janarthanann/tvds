import React from "react";
import {
	Button,
	Checkbox,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	notification,
	theme,
} from "antd";
import { useState, useMemo } from "react";
import { Mode } from ".";
import { trpc } from "../../../utils/trpc";
import { SystemNodeType } from "../../common/dropDown";
import { createFormInput, createFormSelect } from "../../common/formInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ErrorMsg from "../../common/errors";

const layout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 13 },
};

const { useToken } = theme;

export type State =
	| {
		state: Mode.VIEW;
		Id: number;
		type: SystemNodeType;
	}
	| {
		state: Mode.NEW | Mode.NONE;
		Id?: number;
		type?: SystemNodeType;
	};

type Props = {
	refetch: () => void;
	state: State;
	setState: (state: State) => unknown;
};

const systemSchema = yup.object({
	name: yup.string().required().label("Name"),
	url: yup.string().required().label("URL"),
	url2: yup.string().required().label("URL"),
	type: yup.string().oneOf(["DETECTOR", "RECORDER"]).required().label("Type"),
	from: yup.number(),
	to: yup.number(),
	force: yup.boolean(),
	// config: yup.object({
	//   user: yup
	//     .object({
	//       username: yup.string().required(),
	//       password: yup.string().required(),
	//     })
	//     .optional(),
	//   serverUrl: yup.string().required(),
	// }),
});

interface SystemSidebarType {
	name: string;
	url: string;
	type?: SystemNodeType;
	id: number;
	from: number;
	to: number;
}

interface VideoSource {
	name: string;
	id: number;
}
interface Recorder {
	id: number;
	name: string;
	type: string;
	url: string;
	videoSource: VideoSource[];
}

interface Data {
	url: string;
	config?: {
		server_url?: string;
	};
	type: "DETECTOR" | "RECORDER";
	name: string;
	url2: string;
	force: boolean;
}

export default function DeviceDetails(props: Props) {
	type YupSchemaType = yup.InferType<typeof systemSchema>;

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors, isDirty },
	} = useForm<YupSchemaType>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: yupResolver(systemSchema),
	});

	const FormInput = React.useMemo(
		() => createFormInput(control, errors),
		[control, errors]
	);
	const FromSelect = React.useMemo(
		() => createFormSelect(control, errors),
		[control, errors]
	);

	const [form] = Form.useForm();
	const { token } = useToken();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [forceAddModal, setForceAddModal] = useState<boolean>(false);
	const [force, setIsChecked] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<number>();
	const [endDate, setEndDate] = useState<number>();
	const [isConfirmOk, setConfirmOk] = useState<boolean>(false);
	const [id, setId] = useState<number>();
	const [serverUrl, setServerUrl] = useState<string>();

	const { data: systemSidebar } =
		trpc.system.getSystemNodes.useQuery<SystemSidebarType>({
			id: props.state.Id,
			type: props.state.type,
		});

	const sourceId = React.useMemo(() => {
		const [recorder, detector]: Recorder[] = (systemSidebar ??
			[]) as Recorder[];
		return recorder;
	}, [systemSidebar]);

	const SystemNodeTypes = React.useMemo(() => {
		return Object.values(SystemNodeType);
	}, []);

	const addNode = trpc.system.addSystemNode.useMutation();

	const object = useMemo(
		() =>
			systemSidebar ? Object.assign({ id: 0 }, ...systemSidebar) : { id: 0 },
		[systemSidebar]
	);


	trpc.images.getImages.useQuery(
		{
			from: startDate || 0,
			to: endDate || 0,
			id: id || 0,
		},
		{ enabled: isConfirmOk }
	);

	const deleteImage = trpc.images.deleteImages.useMutation();

	const handleDeleteImg = async () => {
		if (startDate && endDate && id) {

			setIsModalOpen(false);
			setConfirmOk(true);

			await deleteImage.mutateAsync({
				id: id,
				to: endDate,
				from: startDate,
			}, {
				onSuccess: () => {
					notification.info({
						message: "Success",
						description: "Images deleted successfully",
						placement: "topRight",
					});
				},

				onError: (err: { message?: string }) => {
					ErrorMsg(err);
				}
			});
		}
	};

	React.useEffect(() => {
		if (systemSidebar) {
			props.state.state === Mode.VIEW
				? reset(object)
				: reset({
					name: "",
					url: "",
					type: undefined,
					from: undefined,
					to: undefined,
				});
		}
	}, [object, props.state.state, reset, systemSidebar]);

	if (props.state.state === Mode.NONE) {
		return (
			<div className="m-auto leading-8">
				<div className="italic">
					Please select a record to preview its details
				</div>
				<div className="m-auto text-center">
					<Button onClick={() => props.setState({ state: Mode.NEW })}>
						Add node
					</Button>
				</div>
			</div>
		);
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		setIsChecked(e.target.checked);
		// setForceAddModal(true);
	};

	const Cancel = () => {
		if (props.state.state === Mode.VIEW) {
			reset(object);
		} else if (props.state.state === Mode.NEW) {
			props.setState({ state: Mode.NONE });
		}
	};

	return (
		<div className="h-[calc(100vh-3.4rem)] overflow-y-auto overflow-x-hidden">
			<Form
				form={form}
				{...layout}
				onFinish={handleSubmit((data) => {
					if (props.state.state === Mode.VIEW) {
						//Update api
					} else if (props.state.state === Mode.NEW) {
						// const config = { serverUrl: serverUrl };
						const host = window.location.hostname;
						const HTTP_URL = "http://13.200.11.229:8080/trpc";

						const config = { serverUrl: HTTP_URL };
						const formdata = { ...data, force, config };

						addNode.mutate(formdata as Data, {
							onSuccess: () => {
								props.refetch();
								notification.info({
									message: "Create",
									description: "Systemnode created successfully",
									placement: "topRight",
								});
							},

							onError: (err: { message?: string }) => {
								ErrorMsg(err);
							}
						});
					}
				})}
			>
				<div className="px-2 h-[3.14rem] items-center flex justify-between">
					<h4 className="gap-10">Device Details</h4>
					{props.state.state === Mode.NEW || Mode.VIEW ? (
						<div className="flex items-center gap-2">
							<Button onClick={Cancel}>Cancel</Button>
							<Button htmlType="submit">Save</Button>
						</div>
					) : null}
				</div>
				<div
					className="h-[calc(100vh-8.6rem)] overflow-y-auto overflow-x-hidden"
					style={{
						borderStyle: token.lineType,
						borderTopWidth: token.lineWidth,
						borderColor: token.colorBorder,
					}}
				>
					<div className="py-4">
						<FormInput name="name" label="Name" />
						<FormInput name="url" label="URL" />

						{props.state.type === "DETECTOR" && (
							<div className="mx-12">
								{/* <Checkbox
									name=""
									checked={isChecked && forceAddModal}
									disabled={isChecked && forceAddModal}
									// onChange={handleCheckboxChange}
								>
									Force add
								</Checkbox> */}
							</div>
						)}

						{props.state.state === Mode.NEW ? (
							<>
								<FormInput name="url2" label="URL2" />
								<Form.Item label="Serverurl">
									<Input
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setServerUrl(event.target.value);
										}}
									/>
								</Form.Item>
								<FromSelect
									name="type"
									label="Type"
									options={SystemNodeTypes.map((item) => ({
										value: item,
									}))}
								/>

								<div className="mx-12">
									<Checkbox
										name="force"
										// checked={isChecked && forceAddModal}
										// disabled={isChecked && forceAddModal}
										onChange={(e) => handleCheckboxChange}
									>
										Force add
									</Checkbox>
								</div>
							</>
						) : null}

						{props.state.type === "RECORDER" && (
							<div
								className=""
								style={{
									borderStyle: token.lineType,
									borderTopWidth: token.lineWidth,
									borderColor: token.colorBorder,
								}}
							>
								<Form.Item name="from" label="From" className="mt-5">
									<DatePicker
										showTime
										format="YYYY-MM-DD HH:mm:ss"
										onChange={(date) => {
											if (date) {
												setStartDate(date.toDate().getTime());
											} else {
												setStartDate(undefined);
											}
										}}
									/>
								</Form.Item>
								<Form.Item name="to" label="To">
									<DatePicker
										showTime
										onChange={(date) => {
											if (date) {
												setEndDate(date.toDate().getTime());
											} else {
												setEndDate(undefined);
											}
										}}
									/>
								</Form.Item>
								{/* <Form.Item name="sourceId" label="To">
									<Select onChange={(value) => setId(parseInt(value))}>
										{systemSidebar
											?.filter((item) => item?.videoSource)[0]
											.videoSource?.map((item) => (
												<Select.Option key={item.id}>{item.id}</Select.Option>
											))}
									</Select>
								</Form.Item> */}
								<Form.Item label="Source">
									<Select onChange={(value) => setId(parseInt(value))}>
										{sourceId?.videoSource?.map((item) => (
											<Select.Option key={item.id}>{item.name}</Select.Option>
										))}
									</Select>
								</Form.Item>

								<div className="flex justify-end px-4">
									<Button
										onClick={() => {
											setIsModalOpen(true);
										}}
										disabled={!endDate || !id}
									>
										Delete Image
									</Button>
								</div>
							</div>
						)}
					</div>
					<Modal
						title="Confirmation"
						open={isModalOpen}
						onCancel={() => setIsModalOpen(false)}
						footer={null}
					>
						Delete Image
						<div className="flex justify-end gap-4">
							<Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
							{/* <Button>Ok</Button> */}
							<Button onClick={handleDeleteImg}>Ok</Button>
						</div>
					</Modal>

					<Modal
						title="Confirmation"
						open={forceAddModal}
						onCancel={() => setForceAddModal(false)}
						footer={null}
					>
						Force Add
						<div className="flex justify-end gap-4">
							<Button
								onClick={() => {
									setForceAddModal(false);
								}}
							>
								Cancel
							</Button>
							<Button onClick={() => setForceAddModal(false)}>Ok</Button>
						</div>
					</Modal>
				</div>
			</Form>
		</div>
	);
}
