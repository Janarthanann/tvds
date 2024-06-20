import React from "react";
import { Table as ReactTable, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

import {
	CaretLeftOutlined,
	CaretRightOutlined,
	StepBackwardOutlined,
	StepForwardOutlined,
} from "@ant-design/icons";
import { Select } from "../common/basic";
import { TableProperties } from ".";
import { Button, Radio } from "antd";

const Navigation = <T,>({ table }: { table: ReactTable<T> }) => (
	<div className="flex items-center">
		<Button type="text"
			onClick={() => table.setPageIndex(0)}
			disabled={!table.getCanPreviousPage()}
			icon={ <StepBackwardOutlined />}
		/>
		<Button type="text"
			onClick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
			icon={ <CaretLeftOutlined/>}
		/>
		<Button type="text"
			onClick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
			icon={ <CaretRightOutlined/>}
		/>
		<Button type="text"
			onClick={() => table.setPageIndex(table.getPageCount() - 1)}
			disabled={!table.getCanNextPage()}
			icon={ <StepForwardOutlined/>}
		/>
	</div>
);

export const Pagination = <T,>({
	table,
	autoPageSize,
	properties,
	setProperties,
}: {
  table: ReactTable<T>;
  autoPageSize: number;
  properties: TableProperties;
  setProperties: React.Dispatch<React.SetStateAction<TableProperties>>;
}) => {
	const paginationRowModel = table.getPaginationRowModel().flatRows;

	const [startIndex, endIndex, len] = React.useMemo(() => {
		if (paginationRowModel.length) {
			const startPaginationIndex = paginationRowModel[0].index;
			const startIndex = table
				.getPrePaginationRowModel()
				.flatRows.findIndex((x) => x.index === startPaginationIndex);
			const endIndex = startIndex + paginationRowModel.length;
			const len = table.getPrePaginationRowModel().flatRows.length;
			return [startIndex + 1, endIndex, len];
		} else {
			return [0, 0, 0];
		}
	}, [table, paginationRowModel]);

	const [selected, setSelected] = React.useState(-1);

	React.useEffect(
		() => table.setPageSize(selected === -1 ? autoPageSize : selected),
		[autoPageSize, table, selected],
	);

	return (
		<div
			className="flex items-center justify-end gap-6 border py-1 px-2"
			style={{ border: "solid 0.1rem #8888", }}
		>
			<div className="flex items-center">
				<div className="mr-2">Flex Width</div>
				<Radio.Group value={properties.extendWidth?"true":"false"} onChange={(e) =>
					setProperties((p) => ({
						...p, extendWidth: e.target.value === "true",
					}))}>
					<Radio.Button value="false">Off</Radio.Button>
					<Radio.Button value="true">On</Radio.Button>
				</Radio.Group>
			</div>
			<div>{startIndex} - {endIndex} of {len}</div>
			<Select
				value={selected}
				// onChange={(value) => setSelected(value)}
				onChange={(value: any) => setSelected(value as number)}
				style={{ width: "6rem" }}
				disabled={false}
				placement="topLeft"
			>
				<Select.Option value={-1}>Auto</Select.Option>
				{[10, 20, 50, 100].map((size) => (
					<Select.Option key={size} value={size}>Show {size}</Select.Option>
				))}
			</Select>
			<Navigation table={table} />
		</div>
	);
};
