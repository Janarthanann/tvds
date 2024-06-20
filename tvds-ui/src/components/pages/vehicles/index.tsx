import VehiclesDetails from "./sidebarRight";
import { Badge, Button, Form, Input, Popover, Select, theme } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { trpc } from "../../../utils/trpc";
import Table, { Columns, TableBar } from "../../table";
import { RowSelectionState } from "@tanstack/react-table";
import type { State as SideBarState } from "./sidebarRight";
import { MdFilterAlt } from "react-icons/md";
import { Error, Loading } from "../../common/error";

interface Detail {
  key: React.Key;
  vehicle: string;
  tag: string[] | string;
  color: string | null;
  name: string | null;
  remarks: string | null;
}

const getKey = (selection: RowSelectionState): number | undefined =>
	+Object.keys(selection)[0];

export enum DropdownType {
  Tag = "Tag",
}
const {useToken} = theme;

interface vehicleFilter {
	vehicleNumber?: string,
	tagIds?: number[],
}

const layout={
	wrapperCol: {span: 14},
	labelCol: {span: 12}
};

export default function Vehicles() {
	const [selected, setSelected] = useState<RowSelectionState>({});
	const [addingNew, setAddingNew] = useState<boolean>(false);
	const {token} = useToken();

	const [filter, setFilter]= useState<vehicleFilter | null>();
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [filteredCount, setFilteredCount] = useState<number | null>();
	const [isButtonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		setFilteredCount(filteredCount);
	}, [filteredCount]);

	const columns: Columns<Detail> = React.useMemo(
		() => [
			{title: "Vehicle", field: "vehicle", width: 150},
			{title: "Tag", field: "tag", width: 100},
			{title: "Color", field: "color", width: 150},
			{title: "Owner Name", field: "name", width: 100},
			{title: "Remarks", field: "remarks", width: 100},
		],
		[]
	);

	const vehicleData = trpc.vehicle.getVehicles.useQuery({ take: 1000, ...filter });
	const tags = trpc.dropdown.useQuery({ type: DropdownType.Tag });

	const data = React.useMemo(
		() =>
			vehicleData.data?.map((item, index) => ({
				key: index,
				vehicle: item.vehicleNumber,
				// tag: item.vehicleTags.map((item) => item.tag.name).join(", "),
				tag: item.vehicleTags.map((t) => tags.data?.find(tag => tag.id === t.tag.id)?.name || "").join(", "),
				color: item.color,
				name: item.ownerName,
				remarks: item.remarks,
			})),
		[tags.data, vehicleData]
	);

	const selectionState = React.useMemo((): SideBarState => {
		if (addingNew) {
			return { state: "new" };
		}
		const s = getKey(selected);

		if (s !== undefined && vehicleData.data?.[s]?.vehicleNumber) {
			return { state: "view", vehicleId: vehicleData.data[s].vehicleNumber };
		} else {
			return { state: "none" };
		}
	}, [addingNew, selected, vehicleData.data]);

	useEffect(() => {
		setAddingNew(false);
	}, [selected]);

	const setSelectionState = React.useCallback((state: SideBarState) => {
		switch (state.state) {
		case "new":
			setAddingNew(true);
			break;
		case "view":
			setAddingNew(false);
			setSelected({ [state.vehicleId]: true });
			break;
		case "none":
			setAddingNew(false);
			setSelected({});
			break;
		}
	}, []);

	const handleFieldsChange = (changedFields: any) => {
		const hasEmptyFields = changedFields.every((field:any) => !field.value);
		setButtonDisabled(hasEmptyFields);
	};

	return (
		<div className="grid col-span-2 grid-cols-[minmax(0,_1fr)_23rem]">
			<div className="grid grid-cols-1">
				{vehicleData.isLoading && <Loading />}
				{vehicleData.isError && <Error error={vehicleData.error?.message} />}
				{(!vehicleData.isLoading && !vehicleData.isError ) &&
				<TableBar
					name="Vehicle List"
					button={
						<div className="flex items-center gap-1">
							<Button className="flex items-center" onClick={()=>setOpen(prev => !prev)}>
								<MdFilterAlt className="text-lg mr-1" />Filters
								<Badge count={filteredCount} offset={[8, 2]} />
							</Button>
							<Popover
								placement="bottom"
								className="mt-4"
								trigger="click"
								open={open}
								content={
									<Form
										form={form}
										{...layout}
										onFieldsChange={handleFieldsChange}
										onFinish={(data)=>{
											const tagIds = data.tagId;
											setFilter({ vehicleNumber: data.vehicleNumber, tagIds });
											// const count = Boolean(data.vehicleNumber) || (Array.isArray(tagIds) && tagIds.length > 0);
											// setFilteredCount(count ? 1 : undefined);

											const count = (data.vehicleNumber ? 1 : 0) + (Array.isArray(tagIds) && tagIds.length > 0 ? 1 : 0);
											setFilteredCount(count > 0 ? count : undefined);

											// console.log("count...", count);
										}}
									>
										<div className="px-3 py-2 items-center gap-4 justify-between" style={{borderStyle: token.lineType, borderWidth: token.lineWidth, borderColor: token.colorBorder}}>
											<div className="items-center gap-4">
												<Form.Item name="vehicleNumber" label="Vehicle Number">
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
												<Button htmlType="submit" disabled={isButtonDisabled} onClick={()=>setOpen(false)}>Apply</Button>
												<Button disabled={isButtonDisabled} onClick={()=>{form.resetFields(), setFilter(null), setFilteredCount(null), setButtonDisabled(true), setOpen(false);}}>Clear</Button>
												<Button onClick={()=>{form.resetFields(),setOpen(false);}}>Close</Button>
											</div>
										</div>
									</Form>
								}
							/>
							<Button disabled={addingNew} onClick={() => setAddingNew(true)}>Add vehicle</Button>
						</div>
					}
				>
					<Table
						height="calc(100vh - 9.1rem)"
						columns={columns}
						value={data}
						onSelection={setSelected}
						selection={selected}
					/>
				</TableBar>}
			</div>
			<VehiclesDetails
				state={selectionState}
				setState={setSelectionState}
				refetch={vehicleData.refetch}
			/>
		</div>
	);
}
