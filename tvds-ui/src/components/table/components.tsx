import React from "react";
import { ColumnDef, Row, RowData } from "@tanstack/react-table";
import { Checkbox, Input, InputNumber } from "antd";
import { Dropdown } from "../common/basic";
import { DropDownItem } from "../common/dropDown";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

export type CellComponentType<T> = Exclude<
	ColumnDef<T, unknown>["cell"],
	undefined | string
>;

type CellComponentProps<T> = Parameters<CellComponentType<T>>[0];

type TextAlign = "left" | "center" | "right";

type CallbackNumber<R> = number | ((row: Row<R>) => number);

type CheckboxCell = {
	type: "checkbox";
};

type TextCell = {
	type: "text";
	align?: TextAlign;
};

type InputCell<R> = {
	type: "input";
	maxLength: CallbackNumber<R>;
	align?: TextAlign;
};

const getInputCellComponent = <R,>(options: InputCell<R>) => {
	const InputCellComponent = ({
		getValue,
		row,
		column: { id },
		table,
	}: CellComponentProps<R>) => {
		const initialValue = getValue<string>();
		// We need to keep and update the state of the cell normally
		const [value, setValue] = React.useState(initialValue);

		// When the input is blurred, we'll call our table meta's updateData function
		const onBlur = () => {
			table.options.meta?.updateData(row.index, id, value);
		};

		// If the initialValue is changed external, sync it up with our state
		React.useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		return (
			<Input
				value={value}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => setValue(e.target.value)}
				maxLength={getNumber(row, options.maxLength)}
				style={{ textAlign: options.align }}
				onBlur={onBlur}
			/>
		);
	};
	return InputCellComponent;
};

type NumberCell<R> = {
	type: "number";
	min?: CallbackNumber<R>;
	max?: CallbackNumber<R>;
	align?: TextAlign;
};

const getNumber = <R,>(
	row: Row<R>,
	num?: CallbackNumber<R>,
): number | undefined => (typeof num === "function" ? num(row) : num);

const getNumberCellComponent = <R,>(options: NumberCell<R>) => {
	const NumberCellComponent = ({
		getValue,
		row,
		column: { id },
		table,
	}: CellComponentProps<R>) => {
		const initialValue = getValue<number>();
		// We need to keep and update the state of the cell normally
		const [value, setValue] = React.useState(initialValue);

		// When the input is blurred, we'll call our table meta's updateData function
		const onBlur = () => {
			table.options.meta?.updateData(row.index, id, value);
		};

		// If the initialValue is changed external, sync it up with our state
		React.useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		return (
			<div onClick={(e) => e.stopPropagation()}>
				<InputNumber
					value={value}
					min={getNumber(row, options.min)}
					max={getNumber(row, options.max)}
					style={{ textAlign: options.align, width: "100%" }}
					onChange={(e: number | null) => e && setValue(e)}
					onBlur={onBlur}
				/>
			</div>
		);
	};
	return NumberCellComponent;
};

const CheckboxCellComponent = <T,>({
	getValue,
	row: { index },
	column: { id },
	table,
}: CellComponentProps<T>) => {
	const onChange = (value: boolean) => {
		table.options.meta?.updateData(index, id, value);
	};

	return (
		<div
			style={{ textAlign: "center" }}
			onClick={(e) => {
				e.stopPropagation();
				onChange(!getValue());
			}}
		>
			<Checkbox
				checked={getValue<boolean>()}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => onChange(e.target.checked)}
			/>
		</div>
	);
};

type DropdownCell = {
	type: "dropdown";
	editable?: boolean;
	items?: DropDownItem[] | null;
};

const getDropdown = (options: DropdownCell) => {
	const DropdownCellComponent = <T,>({
		getValue,
		row,
		column: { id },
		table,
	}: CellComponentProps<T>) => {
		const onChange = (value: unknown) => {
			table.options.meta?.updateData(row.index, id, value);
		};
		return (
			<>
				{options.editable ? (
					<Dropdown
						value={getValue()}
						onChange={onChange}
						items={options.items}
					/>
				) : (
					options.items?.find((v) => v.id === getValue<number>())?.name ?? ""
				)}
			</>
		);
	};
	return DropdownCellComponent;
};

const getTextCellComponent = (options: TextCell) => {
	const TextCellComponent = <T,>({ getValue }: CellComponentProps<T>) => {
		return <div style={{ textAlign: options.align }}>{getValue<string>()}</div>;
	};
	return TextCellComponent;
};

export type ColumnType<R> =
	| InputCell<R>
	| NumberCell<R>
	| CheckboxCell
	| DropdownCell
	| TextCell;

export type Column<R> = {
	cell?: ColumnType<R> | CellComponentType<R>;
};

export const getCellComponent = <R,>(c: Column<R>): CellComponentType<R> => {
	if (typeof c.cell === "function") {
		return c.cell;
	} else if (c.cell) {
		switch (c.cell.type) {
		case "input":
			return getInputCellComponent(c.cell);

		case "number":
			return getNumberCellComponent(c.cell);

		case "checkbox":
			return CheckboxCellComponent;

		case "dropdown":
			return getDropdown(c.cell);

		case "text":
			return getTextCellComponent(c.cell);
		}
	} else {
		return getTextCellComponent({ type: "text" });
	}
};
