import { Button, Form, theme, notification } from "antd";
import { trpc } from "../../../utils/trpc";
import React, { useMemo, useState } from "react";
import { Select } from "../../common/basic";
import { Violations, VehicleType } from "../../common/dropDown";
import { Mode } from ".";
import { formatDate } from "../../util";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createFormInput, createFormSelect } from "../../common/formInput";
import Map from "../map";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { config } from "../../../../config";

// Interfaces

// FIXME: Temporary fix for grpc types
export interface DataList {
	time: string;
	detections: DetectionsList[];
}

export interface DetectionsList {
	id: number;
	vehicleNumber: string;
	vehicleType: string;
	bboxes: Bboxes;
	time: string;
}

export interface Bboxes {
	plate: Plate;
	vehicle: Plate;
	personsList: unknown[];
	headsList: unknown[];
	helmetsList: unknown[];
}

export interface Plate {
	rectList: number[];
	prob: number;
	pb_class: number;
}

export enum DropdownType {
	Tag = "Tag",
}
export type State =
	| {
		mode: Mode.VIEW;
		sourceId: number;
		detectionId: bigint;
	}
	| {
		mode?: Mode.NEW | Mode.NONE;
		sourceId: undefined;
		detectionId: undefined;
	};
const layout = {
	labelCol: { span: 10 },
	wrapperCol: { span: 12 },
};
type Props = {
	modeData: State;
	setState: (state: State) => unknown;
	refetch: () => void;
};
type NullToUndefined<T> = T extends null
	? undefined
	: T extends (infer U)[]
	? NullToUndefined<U>[]
	: T extends Record<string, unknown>
	? { [K in keyof T]: NullToUndefined<T[K]> }
	: T;


const { useToken } = theme;
const bigintSchema = yup
	.mixed()
	.test(
		"is-bigint",
		"Invalid number",
		(value: unknown) => typeof value === "bigint"
	);

const yupSchema = yup.object({
	// hi: bigintSchema.transform((val) => BigInt(val)).required(),
	id: yup.number().required(),
	sourceId: yup.number().required(),
	vehicleNumber: yup.string(),
	detectedVehicleType: yup
		.string()
		.oneOf(["Bike", "Auto", "Car", "Bus", "MiniTruck", "Truck"])
		.optional(),
	createdAt: yup.string(),
	location: yup.string(),
	latitude: yup.number(),
	longitude: yup.number(),
	vehicleType: yup
		.string()
		.oneOf(["Bike", "Auto", "Car", "Bus", "MiniTruck", "Truck"])
		.required(),
	violations: yup
		.array(
			yup
				.string()
				.oneOf([
					"TripleRiding",
					"NoHelmet",
					"SpeedViolation",
					"WrongSide",
					"NoSeatBelt",
					"DistractedDriving",
					"StopLineViolation",
					"SignalJumping",
				])
				.required()
		)
		.required(),
});

const getImageURL = (id: number, time: string) => {
	const imageURL = new URL("/recorder/image", config.SERVER_URL);
	imageURL.searchParams.append("id", id.toString());
	imageURL.searchParams.append("time", time);
	return imageURL.toString();
};

function DetectionImage({
	dataList,
	id,
	selectionIndex,
	onSelectIndex,
	onNaturalSize,
}: {
	dataList: DataList[];
	id: number;
	onNaturalSize: (size: { w: number, h: number }) => unknown,
	selectionIndex: number;
	onSelectIndex: (pointer: 1 | -1) => void;
}) {
	const responseLength = useMemo(() => dataList.length || 0, [dataList]);

	const selectedImageURL = useMemo(() => {
		const time = dataList?.at(selectionIndex)?.time || "";
		return getImageURL(id, time);
	}, [dataList, id, selectionIndex]);

	// console.log("url...", `${IMG_URL}`);
	// const image_indicator={backgroundColor:"rgba(242, 242, 242,0.5)",display:"inline-block",Opacity:"50%",padding:"0 85px"}
	return (
		<div className="flex flex-col my-1">
			<>
				<div className="relative group ">
					<p className="absolute text-center text-black bg-opacity-40 opacity-100 hidden group-hover:block w-full bg-gray-200 text-sm font-bold">
						Source Image : {selectionIndex + 1}
					</p>

					<img onLoad={(e) => {
						onNaturalSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
					}} className="w-full" src={selectedImageURL} />

					<button
						style={{ display: selectionIndex === 0 ? "none" : "block" }}
						className="absolute top-1/2 left-5  transform -translate-y-1/2 rounded-full  p-2 text-rgba(255, 255, 255, 0.85)  transition-all hover:border active:bg-gray-400"
						data-ripple-dark="true"
						onClick={() => onSelectIndex(-1)}
					>
						<BsChevronLeft className="hidden group-hover:block " />
					</button>

					<button
						style={{
							display: selectionIndex < responseLength - 1 ? "block" : "none",
						}}
						className="absolute top-1/2 right-5 transform -translate-y-1/2 rounded-full  p-2  text-rgba(255, 255, 255, 0.85) transition-all hover:border   group-hover:block  active:bg-gray-400"
						data-ripple-dark="true"
						onClick={() => onSelectIndex(1)}
					>
						<BsChevronRight className="hidden group-hover:block " />
					</button>
				</div>
			</>
		</div>
	);
}
function NoDetection() {
	return (
		<div className="m-auto leading-8">
			<div className="italic">Please select an item to view the details</div>
		</div>
	);
}
export default function DetectionDetails({
	modeData,
	refetch,
}: Props) {
	type YupSchemaType = yup.InferType<typeof yupSchema>;

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<YupSchemaType>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: yupResolver(yupSchema),
	});
	const [isOpen, setIsOpen] = useState(false);
	const [selectionIndex, setSelectionIndex] = useState(0);

	const FromInput = useMemo(
		() => createFormInput(control, errors),
		[control, errors]
	);
	const FromSelect = createFormSelect(control, errors);

	const [form] = Form.useForm();
	const { token } = useToken();
	const [violations] = useState<Violations[]>([]);

	const { data: detectionData, refetch: singleDetectionRefetch } =
		trpc.detection.getDetection.useQuery(
			{
				id: modeData.detectionId || BigInt(1),
				sourceId: modeData.sourceId || -1,
			},
			{ enabled: modeData.mode === Mode.VIEW }
		);

	const date = formatDate(detectionData?.createdAt);

	const getImagesData = useMemo(() => {
		const from = detectionData?.startAt
			? new Date(detectionData.startAt).getTime()
			: 0;
		const to =
			detectionData?.endAt || detectionData?.startAt
				? new Date(detectionData.endAt || detectionData.startAt).getTime()
				: 0;

		return {
			from,
			to,
			id: detectionData?.sourceId || -1,
		};
	}, [detectionData]);

	const imageData = trpc.images.getImages.useQuery(getImagesData, {
		enabled: !!detectionData,
	});

	const responseLength = useMemo(
		() => imageData.data?.dataList?.length || 0,
		[imageData.data]
	);

	const imageBox = React.useMemo(() => {
		if (responseLength <= 0) return undefined;

		const dataList: { time: string; detections: string }[] =
			imageData.data?.dataList || [];
		const parsedData = dataList.map((d) => ({
			time: d.time,
			detections: JSON.parse(d.detections) as DataList["detections"],
		}));

		const box = !parsedData.length
			? undefined
			: parsedData[0]?.detections?.find(
				(x) => x.vehicleNumber === detectionData?.vehicleNumber
			)?.bboxes.plate.rectList;

		// console.log("Image box data", box);
		return box;
	}, [imageData.data, detectionData?.vehicleNumber, responseLength]);

	const imageURL = useMemo(() => {
		const time =
			((imageData.data?.dataList || []) as DataList[])?.[0]
				?.time || "";
		const id = detectionData?.sourceId || -1;
		return getImageURL(id, time);
	}, [detectionData, imageData.data]);

	React.useEffect(() => {
		if (detectionData) {
			const { source, createdAt, startAt, endAt, violations, ...rest } =
				detectionData;
			const veh = {
				...rest,
				violations: violations.map((viol) => viol.violationType),
				// FIXME: explicit conversion of big int to to number
				// #https://github.com/jquense/yup/issues/542
				id: rest.id as unknown as number,
				latitude: source.latitude,
				longitude: source.longitude,
				location: source.location,
				detectedVehicleType: rest.vehicleType,
				vehicleType: detectionData.vehicleType,
				createdAt: new Date(createdAt).toLocaleString(undefined, {
					hour12: true,
				}),
				tagId: detectionData.matchedVehicle?.vehicleTags.map((t) => t.tag.id),
			};

			modeData.mode === Mode.VIEW
				? reset(veh as NullToUndefined<typeof veh>)
				: reset({});
			modeData.mode === Mode.VIEW
				? reset(veh as NullToUndefined<typeof veh>)
				: reset({});

			// setEditFormValues(false);
		}
	}, [detectionData, form, modeData, date, violations, reset]);

	const detectionUpdate = trpc.detection.updateDetection.useMutation();

	const [violationValues, vehicleTypes] = React.useMemo(() => {
		return [Object.values(Violations), Object.values(VehicleType)];
	}, []);

	const [naturalSize, setNaturalSize] = React.useState<{ w: number, h: number }>({ w: 1, h: 1 });


	const Cancel = () => {
		if (modeData.mode === Mode.VIEW) {
			reset();
		}
	};

	const onHandleSelectImage = (pointer: 1 | -1) => {
		const newPointer = selectionIndex + pointer;

		setSelectionIndex(
			newPointer >= responseLength
				? responseLength - 1
				: newPointer <= 0
					? 0
					: newPointer
		);
	};

	if (modeData.mode === Mode.NONE) {
		return <NoDetection />;
	}

	return (
		<div className="h-[calc(100vh-3.4rem)] overflow-y-auto overflow-x-hidden">
			<Form
				form={form}
				{...layout}
				onFinish={handleSubmit((data) => {
					// const data = { ...formData, sourceId, id };
					// console.log("submitted:", data);
					detectionUpdate.mutate(data, {
						onSuccess: () => {
							refetch();
							singleDetectionRefetch();
							notification.info({
								message: "Update",
								description: "Detection details updated successfully",
								placement: "topRight",
							});
						},
					});
					// Return the updated formValues
				})}
			>
				<div className="px-2 h-[3.14rem] flex justify-between items-center">
					<h4 className="gap-10">Detection Details</h4>
					<div className="flex items-center gap-2">
						{isOpen && (
							<div className="fixed inset-0 flex items-center justify-center z-50 pr-48  ">
								<div
									className="shadow-lg w-3/4 py-3"
									style={{
										backgroundColor: token.colorBgBase,
										font: token.colorTextBase,
									}}
								>
									<div className="flex justify-between items-center p-3 pt-0">
										<div className="flex items-center">
											Tracking : {detectionData?.vehicleNumber}
										</div>

										<Button onClick={() => setIsOpen(false)}>X</Button>
									</div>
									<Map vehicleNumber={detectionData?.vehicleNumber} />
								</div>
							</div>
						)}
						{isDirty && (
							<>
								<Button onClick={Cancel}>Cancel</Button>
								<Button htmlType="submit">Save</Button>
							</>
						)}
						<Button onClick={() => setIsOpen(true)}>Track</Button>
					</div>
				</div>
				<div>
					<div
						className="grid pt-2"
						style={{
							borderStyle: token.lineType,
							borderTopWidth: token.lineWidth,
							borderBottomWidth: token.lineWidth,
							borderColor: token.colorBorder,
						}}
					>
						{imageBox && (
							<div style={{
								width: "100%",
								height: "0px",
								paddingBottom: `${(naturalSize?.h / naturalSize?.w) * (imageBox[3]) * 100 / (imageBox[2])}%`,
								marginBottom: "1rem",
								backgroundImage: `url(${imageURL})`,
								backgroundPosition: `${imageBox[0] * (1 + imageBox[2]) * 100}% ${imageBox[1] * (1 + imageBox[3]) * 100}%`,
								backgroundSize: `${100 / imageBox[2]}% ${100 / imageBox[3]}% `,
							}} />
						)}

						<FromInput name="vehicleNumber" label="Vehicle Number" />

						<FromInput
							name="createdAt"
							label="Date"
							disabled={modeData.mode === Mode.VIEW}
						/>

						<FromSelect
							name="vehicleType"
							label="Vehicle Type"
							options={vehicleTypes.map((item) => ({
								value: item,
							}))}
						/>

						{/* {detectionData?.matchedVehicle?.type && (
			  <FromSelect
				name="vehicleType"
				disabled
				label="DB Vehicle Type"
				options={vehicleTypes.map((item) => ({
				  value: item,
				}))}
			  />
			)} */}

						<Form.Item
							label="Violation"
							validateStatus={errors.violations && "warning"}
							help={errors.violations?.message}
						>
							<Controller
								name="violations"
								control={control}
								render={({ field }) => (
									<Select {...field} mode="multiple">
										{violationValues.map((item) => (
											<Select.Option key={item} value={item}>
												{item}
											</Select.Option>
										))}
									</Select>
								)}
							/>
						</Form.Item>
						<FromInput
							name="location"
							label="Location"
							disabled={modeData.mode === Mode.VIEW}
						/>
						<FromInput
							name="latitude"
							label="Latitude"
							disabled={modeData.mode === Mode.VIEW}
						/>
						<FromInput
							name="longitude"
							label="Longitude"
							disabled={modeData.mode === Mode.VIEW}
						/>
					</div>
				</div>
			</Form>
			{detectionData && (
				<DetectionImage
					id={getImagesData.id}
					onNaturalSize={setNaturalSize}
					dataList={imageData.data?.dataList || []}
					selectionIndex={selectionIndex}
					onSelectIndex={onHandleSelectImage}
				/>
			)}
		</div>
	);
}
