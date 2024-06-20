import { Button, Form, Select, notification, theme } from "antd";
import React, {useMemo, useState} from "react";
import { trpc } from "../../../utils/trpc";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createFormCheckbox, createFormInput } from "../../common/formInput";
import ErrorMsg from "../../common/errors";

export enum DropdownType {
	Detector = "Detector",
	Recorder = "Recorder"
}

const layout = {
	labelCol: { span: 10 },
	wrapperCol: { span: 12 },
};
const {useToken} = theme;
export type State ={
	state: "view",
	videoId: number,
} | {state: "new" | "none"}

type Props = {
	state: State,
	setState: (state: State) => unknown,
	refetch: ()=>void,
}

const videoSchema = yup.object({
	id: yup.number().default(0).label("ID"),
	name: yup.string().required().label("Name"),
	url: yup.string().required().label("URL"),
	detectorId: yup.number(),
	recorderId: yup.number().required().label("Recorder id"),
	latitude: yup.number().min(-90).max(90).required().label("Latitude"),
	longitude: yup.number().min(-180).max(180).required().label("Longitude"),
	location: yup.string().required().label("Location"),
	position: yup.string().optional(),
	city: yup.string(),
	images: yup.boolean().default(false),
	detection: yup.boolean().default(false),
	video: yup.boolean().default(false),
	storeViolations:yup.boolean().default(false),
	notifyViolations:yup.boolean().default(false),
	storeTag:yup.boolean().default(false),
	notifyTag:yup.boolean().default(false),
	storeMismatch:yup.boolean().default(false),
	notifyMismatch:yup.boolean().default(false),
	notifyAll:yup.boolean().default(false),
	storeAll:yup.boolean().default(false),
});

export default function VideoSourceDetails(props: Props){
	type YupSchemaType = yup.InferType<typeof videoSchema>;

	const ids = props.state.state === "view"
		? [props.state.videoId]
		: undefined;

	const {data: videoSourceSidebar, refetch: ref} = trpc.videoSource.getAllVideoSources.useQuery({
		ids
	}, { enabled: props.state.state === "view" });

	const {handleSubmit, reset, control, formState: {errors, isDirty}} = useForm<YupSchemaType>({
		mode: "onBlur",
		defaultValues: !videoSourceSidebar ? undefined : videoSourceSidebar[0] as unknown as YupSchemaType,
		reValidateMode: "onChange",
		resolver: yupResolver(videoSchema),
	});

	const FormInput = useMemo(()=>createFormInput(control, errors),[control, errors]);
	const FormCheckbox = createFormCheckbox(control, errors);

	const [form] = Form.useForm();
	const {token} = useToken();
	// const [editFormValues, setEditFormValues] = useState<boolean>(false);

	const detectorID = trpc.dropdown.useQuery({type: DropdownType.Detector});
	const recorderID = trpc.dropdown.useQuery({type: DropdownType.Recorder});

	const object = useMemo(() => {
		const defaultObject = { id: 0, recorderId: 0 };
		return videoSourceSidebar
			? Object.assign({}, defaultObject, ...videoSourceSidebar)
			: defaultObject;
	}, [videoSourceSidebar]);

	React.useEffect(()=>{
		if(object) {
			props.state.state === "view" ? reset(object) : reset({});
		}
		props.state.state !== "view" && reset({});
	},[object, props.state.state, reset]);

	const videoSourceUpdate = trpc.videoSource.updateVideoSource.useMutation();
	const videoSourceCreate = trpc.videoSource.createVideoSource.useMutation();
	const videoSourceSync = trpc.videoSource.syncVideoSources.useMutation();

	if(props.state.state === "none") {
		return(
			<div className="m-auto leading-8">
				<div className="italic">Please select an item to view the details</div>
				<div className="m-auto text-center"><Button onClick={() => props.setState({ state: "new" })}>Add video source</Button></div>
			</div>
		);
	}

	const Cancel =()=>{
		if(props.state.state === "view") {
			reset(object);
		}
		else if (props.state.state === "new") {
			props.setState({ state: "none" });
		}
	};

	const onSyncVideoSource = (id: number, syncTo: "DETECTOR" | "RECORDER" ) => {
		console.log(object);

		if(!id || isNaN(id)) {
			notification.error({
				message: "Update",
				description: "Video source ID is missing or invalid",
				placement: "topRight",
			});
			return;
		}

		videoSourceSync.mutate({ sourceId: id, syncTo }, {
			onSuccess:()=> {
				props.refetch();
				ref();
				notification.info({
					message: "Update",
					description: `Video source snyced successfully to ${syncTo}`,
					placement: "topRight",
				});
			},
			onError: (err: { message?: string }) => {
				ErrorMsg(err);
			}
		});
	};

	return(
		<Form
			form={form}
			{...layout}
			onFinish={handleSubmit((data)=> {
				//Handle form submission here

				const { id, detectorId, recorderId, latitude, longitude, ...rest} = data;

				const updatedValues = {
					...rest,
					id: +id,
					detectorId: detectorId ? +detectorId : null,
					recorderId: +recorderId,
					latitude: +latitude,
					longitude: +longitude,
					detectorConfig: undefined,
				};
				console.log("up...", updatedValues);

				if(props.state.state === "view") {
					videoSourceUpdate.mutate(updatedValues, {
						onSuccess:()=> {
							props.refetch();
							ref();
							notification.info({
								message: "Update",
								description: "Video source updated successfully",
								placement: "topRight",
							});
						},
						onError: (err: { message?: string }) => {
							ErrorMsg(err);
						}
					});
				} else if(props.state.state === "new") {
					videoSourceCreate.mutate({ ...updatedValues, latitide: updatedValues.latitude }, {
						onSuccess:()=>{
							props.refetch();
							ref();
							notification.info({
								message: "Create",
								description: "Video source created successfully",
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
				<h4 className="gap-10">Source Details</h4>
				{props.state.state === "new" || isDirty ? (
					<div className="flex items-center gap-2">
						<Button onClick={Cancel}>Cancel</Button>
						<Button htmlType="submit" >Save</Button>
					</div>
				): null}
			</div>
			<div className="h-[calc(100vh-6.6rem)] overflow-y-auto overflow-x-hidden">
				<div className="grid pt-2" style={{borderStyle: token.lineType, borderTopWidth: token.lineWidth, borderColor: token.colorBorder}}>
					<div className="flex gap-4 pb-4 pt-2 m-auto items-center">
						<Button disabled={object.detectorSync === "SYNCED" || props.state.state === "new"} onClick={() => onSyncVideoSource(object.id, "DETECTOR")}>Sync Detector</Button>
						<Button disabled={object.recorderSync === "SYNCED" || props.state.state === "new"} onClick={() => onSyncVideoSource(object.id, "RECORDER")}>Sync Recorder</Button>
					</div>
					{props.state.state === "view" ? (
						<FormInput label="ID" name="id" disabled={props.state.state === "view"}/>
					): null}
					<FormInput label="Name" name="name" />
					<FormInput label="City" name="city" />
					<FormInput label="Location" name="location" />
					<FormInput label="Position" name="position" />
					<FormInput label="URL" name="url" />
					<FormInput label="Latitude" name="latitude" />
					<FormInput label="Longitude" name="longitude" />

					<div className="pt-4" style={{borderStyle: token.lineType, borderTopWidth: token.lineWidth, borderColor: token.colorBorder}}>
						<Form.Item label="Recorder">
							<Controller
								name="recorderId"
								control={control}
								render={({ field }) => (
									<Select
										placeholder="Select any value"
										{...field}
									>
										{recorderID.data?.map((item) => (
											<Select.Option key={item.id} value={item.id}>
												{item.name}
											</Select.Option>
										))}
									</Select>
								)}
							/>
						</Form.Item>

						<Form.Item label="Detector">
							<Controller
								name="detectorId"
								control={control}
								render={({ field }) => (
									<Select
										placeholder="Select any value"
										{...field}
									>
										{detectorID.data?.map((item) => (
											<Select.Option key={item.id} value={item.id}>
												{item.name}
											</Select.Option>
										))}
									</Select>
								)}
							/>
						</Form.Item>

					</div>

					<div className="flex gap-2 mx-auto">
						<FormCheckbox label="Images" name="images" />
						<FormCheckbox label="Detection" name="detection" />
						<FormCheckbox label="Video" name="video" />
					</div>

					<div className="px-8">
						<table className="w-full" style={{borderStyle: token.lineType, borderWidth: token.lineWidth, borderColor:token.colorBorder}}>
							<thead className="uppercase" style={{borderStyle: token.lineType, borderBottomWidth: token.lineWidth, borderColor: token.colorBorder}}>
								<tr className="flex">
									<div className="px-4 py-3 w-28"></div>
									<div className="px-4 py-3">Store</div>
									<div className="px-4 py-3">Notify</div>
								</tr>
							</thead>
							<tbody>
								<tr className="flex gap-11 h-10 items-baseline" style={{borderStyle: token.lineType, borderBottomWidth: token.lineWidth, borderColor: token.colorBorder}}>
									<div className="w-24 px-4">Violations</div>
									<FormCheckbox label="" name="storeViolations" />
									<FormCheckbox label="" name="notifyViolations" />
								</tr>
								<tr className="flex gap-11 h-10 items-baseline" style={{borderStyle: token.lineType, borderBottomWidth: token.lineWidth, borderColor: token.colorBorder}}>
									<div className="w-24 px-4">Tagged</div>
									<FormCheckbox label="" name="storeTag" />
									<FormCheckbox label="" name="notifyTag" />
								</tr>
								<tr className="flex gap-11 h-10 items-baseline" style={{borderStyle: token.lineType, borderBottomWidth: token.lineWidth, borderColor: token.colorBorder}}>
									<div className="w-24 px-4">Mismatches</div>
									<FormCheckbox label="" name="storeMismatch" />
									<FormCheckbox label="" name="notifyMismatch" />
								</tr>
								<tr className="flex gap-11 h-10 items-baseline" style={{borderStyle: token.lineType, borderBottomWidth: token.lineWidth, borderColor: token.colorBorder}}>
									<div className="w-24 px-4">All</div>
									<FormCheckbox label="" name="storeAll" />
									<FormCheckbox label="" name="notifyAll" />
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Form>
	);
}
