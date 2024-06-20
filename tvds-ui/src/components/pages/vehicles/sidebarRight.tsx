import { Button, Form, Select, notification, theme } from "antd";
import React, { useMemo, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { VehicleType } from "../../common/dropDown";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createFormInput, createFormSelect } from "../../common/formInput";
import ErrorMsg from "../../common/errors";

export enum DropdownType {
	Tag = "Tag",
}

export type State =
	| {
			state: "view";
			vehicleId: string;
		}
	| { state: "new" | "none" };

const layout = {
	labelCol: { span: 10 },
	wrapperCol: { span: 12 },
};

type Props = {
	state: State;
	setState: (state: State) => unknown;
	refetch: () => void;
};
const { useToken } = theme;

type NullToUndefined<T> = T extends null
	? undefined
	: T extends (infer U)[]
	? NullToUndefined<U>[]
	: T extends Record<string, unknown>
	? { [K in keyof T]: NullToUndefined<T[K]> }
	: T;

const yupSchema = yup
	.object({
		vehicleNumber: yup.string().required(),
		ownerName: yup.string().nullable(),
		contact: yup.string().nullable(),
		address: yup.string().nullable(),
		color: yup.string().nullable(),
		type: yup
			.string()
			.oneOf(["Bike", "Auto", "Car", "Bus", "MiniTruck", "Truck"])
			.required(),
		// type: yup.array().of(yup.string()),
		tagId: yup.array().of(yup.number().required()),
	})
	.required();

export default function VehiclesDetails(props: Props) {
	type YupSchemaType = yup.InferType<typeof yupSchema>;

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors, isDirty },
	} = useForm<YupSchemaType>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: yupResolver(yupSchema),
	});

	const FromInput = useMemo(()=>createFormInput(control, errors),[control, errors]);
	const FromSelect = createFormSelect(control, errors);

	const [form] = Form.useForm();
	const [editFormValues, setEditFormValues] = useState<boolean>(false);
	const { token } = useToken();
	const { data: vehicleData, refetch: ref } = trpc.vehicle.getVehicle.useQuery(
		{
			vehicleNumber: (props.state as { state: "view"; vehicleId: string })
				.vehicleId,
		},
		{ enabled: props.state.state === "view" }
	);

	const vehicleTypes = React.useMemo(() => {
		return Object.values(VehicleType);
	}, []);

	const vehicleTags = trpc.dropdown.useQuery({ type: DropdownType.Tag });

	React.useEffect(() => {
		if (vehicleData) {
			const { vehicleTags, ...remainingData } = vehicleData;
			const v2 = {
				...remainingData,
				tagId: vehicleTags.map((t) => t.tag.id),
			};
			props.state.state === "view"
				? reset(v2 as NullToUndefined<typeof v2>)
				: reset({});

			setEditFormValues(false);
		}
		props.state.state !== "view" && reset({});
	}, [vehicleData, form, props.state, reset]);

	React.useEffect(() => {
		props.state.state === "new" && reset({});
	}, [props.state.state, reset]);

	const vehicleDetailUpdate = trpc.vehicle.updateVehicle.useMutation();
	const create = trpc.vehicle.createVehicle.useMutation();

	if (props.state.state === "none") {
		return (
			<div className="m-auto leading-8">
				<div className="italic">Please select an item to view the details</div>
				<div className="m-auto text-center">
					<Button onClick={() => props.setState({ state: "new" })}>
						Add vehicle
					</Button>
				</div>
			</div>
		);
	}

	const Cancel = () => {
		if (props.state.state === "view") {
			reset(vehicleData as NullToUndefined<typeof vehicleData>);
		} else if (props.state.state === "new") {
			props.setState({ state: "none" });
		}
	};

	return (
		<Form
			form={form}
			{...layout}
			onFinish={handleSubmit((data) => {
				// Handle form submission here
				console.log("Form data:", data);
				if (props.state.state === "view") {
					// console.log(data, "79");
					vehicleDetailUpdate.mutate(data, {
						onSuccess: () => {
							props.refetch();
							ref();
							notification.info({
								message: "Update",
								description: "Vehicle details updated successfully",
								placement: "topRight",
							});
							console.log("vehicle success");
						},
						onError: (err: { message?: string }) => {
							ErrorMsg(err);
						}

					});
				} else if (props.state.state === "new") {
					const formData = {
						...data,
						color: data.color ?? undefined,
						address: data.address ?? undefined,
						contact: data.contact ?? undefined,
						ownerName: data.ownerName ?? undefined,
					};
					create.mutate(formData, {
						onSuccess: () => {
							props.refetch();
							notification.info({
								message: "Create",
								description: "Vehicle details created successfully",
								placement: "topRight",
							});
						},
						onError: (err: { message?: string }) => {
							ErrorMsg(err);
						}

					});
				}
			})}
			onFieldsChange={() => editFormValues || setEditFormValues(true)}
		>
			<div className="px-2 h-[3.14rem] flex justify-between items-center">
				<h4 className="gap-10">Vehicle Details</h4>

				{props.state.state === "new" || isDirty ? (
					<div className="gap-2 flex">
						<Button onClick={Cancel}>Cancel</Button>
						<Button htmlType="submit">Save</Button>
					</div>
				) : null}
			</div>
			<div className="h-[calc(100vh-6.6rem)] overflow-y-auto overflow-x-hidden">
				<div
					className="grid pt-2"
					style={{
						borderStyle: token.lineType,
						borderTopWidth: token.lineWidth,
						borderBottomWidth: token.lineWidth,
						borderColor: token.colorBorder,
					}}
				>
					<FromInput
						name="vehicleNumber"
						label="Vehicle Number"
						disabled={props.state.state === "view"}
					/>
					<FromInput name="ownerName" label="Owner Name" />
					<FromInput name="contact" label="Contact" />
					<FromInput name="address" label="Address" />
					<FromInput name="color" label="Color" />
					<FromSelect
						name="type"
						label="Vehicle Type"
						options={vehicleTypes.map((item) => ({
							value: item,
						}))}
					/>
					{/* <FromSelect name="tagId" label="Tags" mode="multiple"
						options={vehicleTags.data?.map((tag) => ({
							id: tag.id,
							value: tag.id,
						}))}
					/> */}

					<Form.Item label="Tags">
						<Controller
							name="tagId"
							control={control}
							render={({ field }) => (
								<Select {...field} mode="multiple">
									{vehicleTags.data?.map((item) => (
										<Select.Option key={item.id} value={item.id}>
											{item.name}
										</Select.Option>
									))}
								</Select>
							)}
						/>
					</Form.Item>
				</div>
			</div>
		</Form>
	);
}
