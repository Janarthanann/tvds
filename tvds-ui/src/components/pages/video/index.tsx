
import React, { useEffect, useState } from "react";
import VideoSourceDetails from "./sidebarRight";
import Table, { Columns, TableBar } from "../../table";
import { trpc } from "../../../utils/trpc";
import type { State as SideBarState } from "./sidebarRight";
import { Button } from "antd";
import { RowSelectionState } from "@tanstack/react-table";
import { Error, Loading } from "../../common/error";

type SyncStatus = "synced" | "syncing" | "not_synced";


const getKey = (selection: RowSelectionState): number | undefined => +Object.keys(selection)[0];

export default function VideoSource(){
	const[addingNew, setAddingNew] = useState<boolean>(false);
	const[selected, setSelected]=useState<RowSelectionState>({});

	const videoSource = trpc.videoSource.getAllVideoSources.useQuery({});

	const data= React.useMemo(()=>
		videoSource.data?.map((item, index)=>({
			key: index,
			id: item.id,
			name: item.name,
			detectorId: item.detectorId,
			url: item.url,
			location: item.location,
			detectorSync: item.detectorSync,
			recorderSync: item.recorderSync,
		})), [videoSource]
	);

	type TableRowType = NonNullable<Exclude<typeof data, undefined>[0]>;


	const columns: Columns<TableRowType> = React.useMemo(
		() => [
			{title: "ID", field: "id",width: 100},
			{title: "Name",field: "name",width: 100},
			{title: "URL", field: "url",width: 100},
			{title: "Location", field: "location",width: 100},
			{title: "Detector Status", field: "detectorSync",width: 100},
			{title: "Recorder Status", field: "recorderSync", width: 100},
		],[],
	);


	const selectionState = React.useMemo((): SideBarState => {
		if(addingNew) {
			return {state:"new"};
		}
		const select = getKey(selected);
		if(select !== undefined && videoSource.data?.[select]?.id) {
			return{state: "view", videoId: videoSource.data[select].id};
		} else {
			return {state: "none"};
		}
	},[addingNew, selected, videoSource.data]);

	useEffect(() => {
		setAddingNew(false);
	}, [selected]);

	const setSelectionState = React.useCallback((state: SideBarState)=>{
		switch(state.state){
		case "new":
			setAddingNew(true);
			break;
		case "view":
			setAddingNew(false);
			setSelected({[state.videoId]: true});
			break;
		case "none":
			setAddingNew(false);
			setSelected({});
		}
	},[]);

	if(videoSource.isError){
		return <Error error={videoSource.error} />;
	}

	if(videoSource.isLoading) {
		return <Loading />;
	}

	return(
		<div className="grid col-span-2 grid-cols-[minmax(0,_1fr)_23rem]">
			<div className="grid grid-cols-1">
				<TableBar name="Video Source" button={<Button disabled={addingNew} onClick={()=>setAddingNew(true)}>Add video source</Button>}>
					<Table
						height="calc(100vh - 9.1rem)"
						columns={columns}
						value={data}
						onSelection={setSelected}
						selection={selected}
					/>
				</TableBar>
			</div>
			<VideoSourceDetails state={selectionState} setState={setSelectionState} refetch={videoSource.refetch}/>
		</div>
	);
}
