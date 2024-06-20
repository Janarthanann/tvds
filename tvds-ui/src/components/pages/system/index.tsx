import DeviceDetails from "./sidebarRight";
import React, { useState, useEffect } from "react";
import Table, { Columns, TableBar } from "../../table";
import { trpc, TrpcRouterOutput } from "../../../utils/trpc";
import { SystemNodeType } from "../../common/dropDown";
import { Button } from "antd";
import { RowSelectionState } from "@tanstack/react-table";
import type {State as SideBarState} from "./sidebarRight";
import { Error, Loading } from "../../common/error";

export enum Mode {
	NEW = "NEW",
	EDIT = "EDIT",
	VIEW = "VIEW",
	NONE = "NONE"
}

interface Detail {
    key: React.Key;
	id: number;
    name: string;
    url: string;
	type: SystemNodeType;
}

const getKey = (selection: RowSelectionState): number | undefined =>
	+Object.keys(selection)[0];

export default function System(){
	// const [controls, setControls]=useState<Mode>(Mode.NONE);
	const [addingNew, setAddingNew] = useState<boolean>(false);
	const [selected, setSelected] = useState<RowSelectionState>({});

	const columns: Columns<Detail> = React.useMemo(
		() => [
			{title: "ID", field: "id", width: 100},
			{title: "Name", field: "name", width: 100},
			{title: "URL", field: "url", width: 150},
			{title: "Type", field: "type", width: 100},
		],[],
	);

	const system = trpc.system.getSystemNodes.useQuery({});

	const data = React.useMemo(()=>
		system.data?.map((item, index)=>({
			key: index,
			id: item.id,
			name: item.name,
			url: item.url,
			type: item.type,
		})), [system]
	);

	const selectionState = React.useMemo((): SideBarState => {
		if (addingNew) {
			return { state: Mode.NEW };
		}
		const selection = getKey(selected);

		if (selection !== undefined && system.data?.[selection]?.id) {
			const { id, type } = system.data[selection];
			return { state: Mode.VIEW, Id: id, type: type };
		} else {
			return { state: Mode.NONE };
		}
	}, [addingNew, selected, system.data]);

	useEffect(() => {
		setAddingNew(false);
	}, [selected]);

	const setSelectionState = React.useCallback((state: SideBarState)=>{
		switch(state.state){
		case Mode.NEW:
			setAddingNew(true);
			break;
		case Mode.VIEW:
			setAddingNew(false);
			setSelected({[state.Id]: true});
			break;
		case Mode.NONE:
			setAddingNew(false);
			setSelected({});
		}
	},[]);

	if(system.isError) {
		return <Error error={system.error?.message} />;
	}

	if(system.isLoading) {
		return <Loading />;
	}



	return(
		<div className="grid col-span-2 grid-cols-[minmax(0,_1fr)_23rem]">
			<div className="grid grid-cols-1">
				<TableBar name="System" button={<Button disabled={addingNew} onClick={()=>setAddingNew(true)}>Add node</Button>}>
					<Table
						height="calc(100vh - 9.1rem)"
						columns={columns}
						value={data}
						selection={selected}
						onSelection={setSelected}
					/>
				</TableBar>
			</div>
			<DeviceDetails state={selectionState} setState={setSelectionState} refetch={system.refetch} />
		</div>
	);
}
