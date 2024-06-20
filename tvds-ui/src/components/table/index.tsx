import React, { ReactElement, ReactNode } from "react";
import {
	ColumnDef,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	RowSelectionState,
	AccessorFn,
	flexRender,
	createColumnHelper,
	DeepKeys,
	FilterFn,
} from "@tanstack/react-table";
import { CellComponentType, ColumnType, getCellComponent } from "./components";
import { Pagination } from "./pagination";
import {
	Container,
	Resizer,
	StyledTable,
	TBody,
	THead,
	TableBox,
} from "./body";
import { toCsv } from "./csv";
import { saveAs } from "file-saver";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Input, theme } from "antd";
import { ThemeProvider } from "@emotion/react";

export interface TableProperties {
	extendWidth: boolean;
}

function useSkipper() {
	const shouldSkipRef = React.useRef(true);
	const shouldSkip = shouldSkipRef.current;

	// Wrap a function with this to skip a pagination reset temporarily
	const skip = React.useCallback(() => {
		shouldSkipRef.current = false;
	}, []);

	React.useEffect(() => {
		shouldSkipRef.current = true;
	});

	return [shouldSkip, skip] as const;
}

export type Column<T> = {
	title: string;
	field: DeepKeys<T> | AccessorFn<T>;
	cell?: ColumnType<T> | CellComponentType<T>;
	minWidth?: number;
	width?: number;
	maxWidth?: number;
};

export type Columns<T> = Column<T>[];

const stringFilter: FilterFn<any> = (row, columnId, filterValue: string) => {
	const value = row.getValue(columnId);
	if (typeof value === "string") {
		const str = value.toLowerCase();
		return str.includes(filterValue.toLowerCase());
	} else if (typeof value === "number") {
		return value.toString().includes(filterValue);
	}

	return false;
};

export default function Table<T>({
	columns: userColumns,
	value,
	onChange,
	selection,
	onSelection,
	multiSelect,
	height,
	globalFilter,
	innerRef,
}: {
	columns: Columns<T>;
	value?: T[];
	onChange?: (arg0: (arg0: T[]) => T[]) => void;
	selection?: RowSelectionState;
	onSelection?: (state: RowSelectionState) => void;
	multiSelect?: boolean;
	height: string;
	globalFilter?: string;
	innerRef?: React.Ref<{ downloadCsv(): void }>;
}) {
	const columns = React.useMemo<ColumnDef<T, unknown>[]>(() => {
		const columnHelper = createColumnHelper<T>();
		return userColumns.map((c) =>
			columnHelper.accessor(c.field, {
				header: c.title,
				cell: getCellComponent(c),
				minSize: c.minWidth,
				size: c.width,
				maxSize: c.maxWidth,
			})
		);
	}, [userColumns]);

	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

	const [innerRowSelection, setInnerRowSelection] = React.useState({});

	const rowSelection = React.useMemo(
		() => selection ?? innerRowSelection,
		[innerRowSelection, selection]
	);

	const data = React.useMemo(() => value ?? [], [value]);

	const reactTable = useReactTable<T>({
		data,
		columns,
		globalFilterFn: stringFilter,
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		autoResetPageIndex,
		// Provide our updateData function to our table meta
		meta: {
			updateData: (rowIndex, columnId, value) => {
				// Skip page index reset until after next rerender
				skipAutoResetPageIndex();
				onChange &&
					onChange((old) =>
						old.map((row, index) =>
							index === rowIndex
								? {
									...row,
									[columnId]: value,
								}
								: row
						)
					);
			},
		},
		state: {
			rowSelection,
			globalFilter,
		},
		enableRowSelection: !!onSelection,
		enableMultiRowSelection: multiSelect,
		onRowSelectionChange: (updater) => {
			if (!onSelection) {
				return;
			}
			const onSelectionUpdater = (selection: RowSelectionState) => {
				// Skip page index reset until after next rerender
				skipAutoResetPageIndex();
				const newValue =
					typeof updater === "function"
						? multiSelect
							? updater(selection)
							: updater({})
						: updater;
				onSelection(newValue);
				return newValue;
			};

			if (selection !== undefined) {
				onSelectionUpdater(selection);
			} else {
				setInnerRowSelection((p) => {
					return onSelectionUpdater(p);
				});
			}
		},
	});

	const boxRef = React.useRef<HTMLDivElement>(null);
	const [autoPageSize, setAutoPageSize] = React.useState(1);

	const headRef = React.useRef<HTMLTableSectionElement>(null);
	const footRef = React.useRef<HTMLDivElement>(null);
	const rowRef = React.useRef<(HTMLTableRowElement | null)[]>([]);

	const updateAutoSize = React.useCallback(() => {
		if (
			boxRef.current &&
			headRef.current &&
			rowRef.current[0] &&
			footRef.current
		) {
			const box = boxRef.current.getBoundingClientRect().height;
			const head = headRef.current.getBoundingClientRect().height;
			const foot = footRef.current.getBoundingClientRect().height;
			const bodyHeight = box - head - foot;
			const row = rowRef.current[0].getBoundingClientRect().height;
			const size = Math.floor(bodyHeight / row);
			setAutoPageSize(size);
		}
	}, []);

	React.useEffect(() => {
		const currentRef = boxRef.current;
		if (currentRef && data.length) {
			const resizeObserver = new ResizeObserver(updateAutoSize);
			resizeObserver.observe(currentRef);
			return () => {
				if (currentRef) {
					resizeObserver.unobserve(currentRef);
				} else {
					resizeObserver.disconnect();
				}
			};
		}
	}, [boxRef, updateAutoSize, data]);

	const [properties, setProperties] = React.useState<TableProperties>({
		extendWidth: false,
	});

	React.useImperativeHandle(innerRef, () => ({
		downloadCsv() {
			const columns = reactTable.getAllColumns().map((x) => x.columnDef.header);
			const rows = reactTable
				.getPrePaginationRowModel()
				.rows.map((x) => x.getAllCells().map((x) => x.getValue()));
			const csv = toCsv([columns, ...rows]);
			const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
			saveAs(blob, "download.csv");
		},
	}));

	const token = theme.useToken();

	const colors = {
		primary: token.token.colorPrimaryBorderHover,
	};

	return (
		<ThemeProvider theme={{colors}}>
			<TableBox ref={boxRef}>
				<Container height={height} style={{ width: "100%", overflowX: "auto" }}>
					<div>
						<StyledTable
							style={{
								width: properties?.extendWidth
									? reactTable.getCenterTotalSize()
									: "100%",
							}}
						>
							<THead ref={headRef}>
								{reactTable.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<th
													key={header.id}
													colSpan={header.colSpan}
													style={{
														position: "relative",
														width: header.getSize(),
														...(header.column.getIsResizing()
															? { backgroundColor: "#0002" }
															: {}),
													}}
												>
													{header.isPlaceholder
														? null
														: flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
													{header.column.getCanResize() && (
														<Resizer
															onMouseDown={header.getResizeHandler()}
															onTouchStart={header.getResizeHandler()}
															isResizing={header.column.getIsResizing()}
														/>
													)}
												</th>
											);
										})}
									</tr>
								))}
							</THead>
							<TBody>
								{reactTable.getRowModel().rows.map((row, index) => {
									return (
										<tr
											key={row.id}
											ref={(ref) => (rowRef.current[index] = ref)}
											style={{
												backgroundColor:
												onSelection && row.getIsSelected()
													? "#888A"
													: undefined,
												cursor: "pointer",
											}}
											onClick={() => onSelection && row.toggleSelected()}
										>
											{row.getVisibleCells().map((cell) => (
												<td
													key={cell.id}
													style={{ width: cell.column.getSize() }}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											))}
										</tr>
									);
								})}
							</TBody>
						</StyledTable>
					</div>
					{data.length === 0 && <div style={{ margin: "auto" }}>No Content</div>}
				</Container>
				<div ref={footRef}>
					<Pagination
						table={reactTable}
						autoPageSize={autoPageSize}
						properties={properties}
						setProperties={setProperties}
					/>
				</div>
			</TableBox>
		</ThemeProvider>
	);
}

export const TableBar = (props: {
	name?: ReactNode;
	toolbar?: ReactNode;
	children: ReactElement;
	button?: ReactNode;
}) => {
	const [globalFilter, setGlobalFilter] = React.useState("");

	type TableInner = {
		downloadCsv(): void;
	};
	const ref = React.useRef<TableInner>();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.5rem",
					padding: "0.5rem 0.75rem",
					border: "0.0625rem solid #0001",
					justifyContent: "end",
				}}
			>
				<div style={{ marginInlineEnd: "auto", fontWeight: "500" }}>{props.name}</div>
				<div>{props.button}</div>
				<Input
					placeholder="Search in the results..."
					value={globalFilter}
					addonBefore={<SearchOutlined />}
					onInput={(e) => setGlobalFilter(e.currentTarget.value)}
					className="max-w-xs w-full"
				/>
				<Button onClick={() => ref.current?.downloadCsv()}>
					<DownloadOutlined />
				</Button>
			</div>
			{React.cloneElement(props.children, {
				globalFilter,
				innerRef: ref,
			})}
		</div>
	);
};
