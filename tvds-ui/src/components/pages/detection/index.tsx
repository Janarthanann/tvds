import React, { useEffect, useMemo, useState } from "react";
import { trpc } from "../../../utils/trpc";
import DetectionDetails from "./sidebarRight";
import Table, { Columns, TableBar } from "../../table";
import { RowSelectionState } from "@tanstack/react-table";
import type { State as SideBarState } from "./sidebarRight";
import { ComputedDetection } from "tvds-server/src/routers/detections/detection_events";
import type { inferRouterOutputs } from "@trpc/server";
import AppRouter from "tvds-server";
import { Badge, DatePicker, Form, Input, Select, theme } from "antd";
import { MdFilterAlt } from "react-icons/md";
import { Error, Loading } from "../../common/error";
import { Button, Popover } from "antd";
import "../../../index.css";


const DETECTIONS_TAKE = 1000;

export enum DropdownType {
	Tag = "Tag",
}

export enum Mode {
	NEW = "NEW",
	EDIT = "EDIT",
	VIEW = "VIEW",
	NONE = "NONE"
}

type TableRowType = {
	key: number | string;
	id: bigint;
	idDisplay?: string;
	vehicle: string;
	tags: string | undefined;
	violation: string;
	time: string;
	sourceName: string;
	location: string;
	sourceId: number;
	vehicleType: string;
	hasMismatch: string;
};

const getKey = (selection: RowSelectionState): number | undefined =>
	+Object.keys(selection)[0];

type DetectionList =
	inferRouterOutputs<AppRouter>["detection"]["getDetections"];



const detectionsDataToTable = (
	detections: NonNullable<DetectionList>
): TableRowType[] =>
	detections.map((item) => ({
		key: `${item.sourceId}-${item.id}`,
		id: item.id,
		idDisplay: item.id.toString(),
		vehicle: item.vehicleNumber,
		tags: item.matchedVehicle?.vehicleTags?.map(t => t.tag.name).join(", "),
		vehicleType: item.vehicleType,
		violation: item.violations.map((item) => item.violationType).join(", "),
		time: new Date(item.createdAt).toLocaleString(),
		sourceName: item.source.name,
		location: item.source.location,
		sourceId: item.sourceId,
		hasMismatch: item.matchedVehicle && item.vehicleType !== item.matchedVehicle?.type ? "MISMATCH" : "",
	}));

const liveDetectionToTable = (
	data: ComputedDetection[]
): TableRowType[] => {

	return data.map((d) => ({
		key: `${d.sourceId}-${d.detectionId}`,
		id: d.detectionId as bigint,
		vehicle: d.vehicleNumber,
		tags: (d.matchedVehicle?.vehicleTags.map((x) => x.tag.name) ?? []).join(", "
		),
		vehicleType: d.vehicleType,
		violation: d.violations.map((item) => item.type).join(", "),
		time: new Date(d.startAt).toLocaleString(),
		sourceName: d.source.name,
		location: d.source.location,
		sourceId: d.sourceId,
		hasMismatch: d.hasMismatch ? "MISMATCH" : "",
	}));
};

const { useToken } = theme;


interface Filter {
	startTime?: string;
	endTime?: string;
	vehicleNumber?: string;
	tagIds?: number[];
	location?: string;
}

const layout = {
	labelCol: { span: 10 },
	wrapperCol: { span: 14 }
};

export default function Detection() {
	const [controls, setControls] = useState<Mode>(Mode.NONE);
	const [selected, setSelected] = useState<RowSelectionState | undefined>(
		undefined
	);

	const [form] = Form.useForm();

	const [tableData, setTableData] = useState<TableRowType[]>([]);
	const { token } = useToken();
	const [filteredCount, setFilteredCount] = useState<number | null>();
	const [isButtonDisabled, setButtonDisabled] = useState(true);
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState<Filter | null>();

	useEffect(() => {
		setFilteredCount(filteredCount);
	}, [filteredCount]);


	const isLiveDetectionEnabled = useMemo(() => {
		const isFilterActive = filter ? Object.keys(filter).length > 0 : false;
		return !isFilterActive;
		return !isFilterActive;
	}, [filter]);

	trpc.detection.realtimeDetectionUpdates.useSubscription(undefined, {
		enabled: isLiveDetectionEnabled,
		onData(data) {
			//   console.log("data from subscription ===>", data);
			setTableData((oldData) => [...liveDetectionToTable(data), ...oldData]);
			setSelected((selected) => {
				if (!selected) {
					return selected;
				}
				const key = getKey(selected);
				if (key === undefined) {
					return selected;
				}
				return { [(key + data.length).toString()]: true };
			});
		},
		onError: (err) => {
			console.log("Error in subscription ", err.message);
		},
		onStarted() {
			console.log("Subscription initiated for live detections");
		},
	});

	const { refetch: refetchDetections, isLoading, isError, error } = trpc.detection.getDetections.useQuery(
		{ take: DETECTIONS_TAKE, ...filter },
		{
			onSuccess: (detections) => {
				setTableData(detectionsDataToTable(detections));
			},
		}
	);




	const tags = trpc.dropdown.useQuery({ type: DropdownType.Tag });

	const columns: Columns<TableRowType> = React.useMemo(
		() => [
			{ title: "ID", field: "idDisplay", width: 50 },
			{ title: "Vehicle", field: "vehicle", width: 120 },
			{ title: "Vehicle Type", field: "vehicleType", width: 100 },
			{ title: "Tags", field: "tags", width: 150 },
			{ title: "Violation", field: "violation", width: 150 },
			{ title: "Time", field: "time", width: 150 },
			{ title: "Source Name", field: "sourceName", width: 100 },
			{ title: "Location", field: "location", width: 150 },
			{ title: "Mismatch", field: "hasMismatch", width: 150 },
		],
		[]
	);

	const selectionState = React.useMemo((): SideBarState => {
		if (controls === Mode.NEW) {
			return { mode: Mode.NEW, sourceId: undefined, detectionId: undefined };
		}

		if (!selected) {
			return { mode: Mode.NONE, sourceId: undefined, detectionId: undefined };
		}

		const d = getKey(selected);
		if (d !== undefined && tableData[d]?.id) {
			return {
				mode: Mode.VIEW,
				detectionId: tableData[d].id,
				sourceId: tableData[d].sourceId,
			};
		} else {
			return { mode: Mode.NONE, sourceId: undefined, detectionId: undefined };
		}
	}, [controls, selected, tableData]);

	const onChangeControls = React.useCallback((state: SideBarState) => {
		if (state.mode === Mode.NEW || state.mode === Mode.NONE) {
			setControls(state.mode);
			setSelected(undefined);
		} else if (state.mode === Mode.VIEW) {
			setControls(state.mode);
			setSelected({ [`${state.detectionId}-${state.sourceId}`]: true });
		} else {
			// FIXME: edit state
		}
	}, []);

	const handleKey = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
		setSelected(selected => {
			if (event.key === "ArrowUp" && selected) {
				const key = getKey(selected);
				if (key !== undefined && key > 0) {
					const newSelection = { [(key - 1).toString()]: true };
					return (newSelection);
				} else {
					return selected;
				}
			} else if (event.key === "ArrowDown" && selected) {
				const key = getKey(selected);
				if (key !== undefined && key < tableData.length - 1) {
					const newSelection = { [(key + 1).toString()]: true };
					return (newSelection);
				} else {
					return selected;
				}
			} else if (event.key === "Escape") {
				return (undefined);
			} else {
				return selected;
			}
		});
	}, [tableData.length]);

	const clear = () => {
		form.resetFields();
		setFilter(null);
		setButtonDisabled(true);
		setFilteredCount(null);
		setOpen(false);
	};

	const handleFieldsChange = (changedFields: any) => {
		const hasEmptyFields = changedFields.some((field: any) => !field.value);
		setButtonDisabled(hasEmptyFields);
	};

	console.log("rendering table...", selectionState);

	return (
		<div className="grid col-span-2 grid-cols-[minmax(0,_1fr)_23rem]">
			<div className="grid grid-cols-1">
				{isLoading && <Loading />}
				{isError && <Error error={error.message} />}
				{(!isLoading && !isError) && <div tabIndex={0} onKeyUp={handleKey}>
					<TableBar name="Detection List" button={
						<>
							<Button className="flex items-center" onClick={() => setOpen(prev => !prev)}>
								<MdFilterAlt className="text-lg mr-1" />Filters
								<Badge count={filteredCount} offset={[8, 2]} />
							</Button>
							<Popover
								placement="bottom"
								title=""
								trigger="click"
								open={open}
								content={
									<Form
										form={form}
										{...layout}
										onFieldsChange={handleFieldsChange}
										onFinish={(data) => {
											if (data?.startTime) {

												new Date(data.startTime).toISOString();
											} else if (data?.endTime) {
												new Date(data.endTime).toISOString();
											} else {
												undefined;
											}

											const tagIds = data.tagId;
											setFilter({ startTime: data?.startTime, endTime: data?.endTime, vehicleNumber: data?.vehicleNumber, location: data?.location, tagIds: data?.tagId });

											const count =
												(data.startTime ? 1 : 0) +
												(data.endTime ? 1 : 0) +
												(data.location ? 1 : 0) +
												(data.vehicleNumber ? 1 : 0) +
												(Array.isArray(tagIds) && tagIds.length > 0 ? 1 : 0);

											setFilteredCount(count > 0 ? count : undefined);
											// console.log("count...", count);
										}}
									>
										<div className="px-3 py-2 items-center gap-4" style={{ borderStyle: token.lineType, borderWidth: token.lineWidth, borderColor: token.colorBorder }}>
											<div className="items-center gap-4">
												<Form.Item name="vehicleNumber" label="Vehicle Number">
													<Input />
												</Form.Item>
												<Form.Item label="Start" name="startTime">
													<DatePicker showTime />
												</Form.Item>
												<Form.Item label="End" name="endTime">
													<DatePicker showTime />
												</Form.Item>
												<Form.Item name="location" label="Location">
													<Input />
												</Form.Item>
												<Form.Item label="Tags" name="tagId">
													<Select
														mode="multiple"
													>
														{tags.data?.map((item) => (
															<Select.Option key={item.id} value={item.id}>
																{item.name}
															</Select.Option>
														))}
													</Select>
												</Form.Item>
											</div>
											<div className="flex gap-2 justify-end">
												<Button htmlType="submit" disabled={isButtonDisabled} onClick={() => setOpen(false)}>Apply</Button>
												<Button disabled={isButtonDisabled} onClick={clear}>Clear</Button>
												<Button onClick={() => { form.resetFields(), setOpen(false); }}>Close</Button>
											</div>
										</div>
									</Form>
								}
							/>
						</>
					}>
						<Table
							height="calc(100vh - 9.1rem)"
							columns={columns}
							value={tableData}
							onSelection={controls === Mode.NEW ? undefined : setSelected}
							selection={selected}
						/>
					</TableBar>
				</div>}
			</div>
			<DetectionDetails
				modeData={selectionState}
				setState={onChangeControls}
				refetch={refetchDetections}
			/>
		</div>
	);
}
