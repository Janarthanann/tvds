import { Checkbox, Form, Input, Select } from "antd";
import { Controller, UseFormReturn, Path } from "react-hook-form";
import React from "react";

type SelectOption = {
    value: string | number;
	id?: number
};

export function createFormInput<SchemaType extends Record<string, any>>(
	control: UseFormReturn<SchemaType>["control"],
	errors: UseFormReturn<SchemaType>["formState"]["errors"]
) {
	return function FormInput(props: {
		label: string, name: Path<SchemaType>, disabled?: boolean
	} ) {
		
		return <Form.Item
			label={props.label}
			validateStatus={errors[props.name] && "error"}
			help={errors[props.name]?.message as string}
		>
			<Controller
				name={props.name}
				control={control}
				render={({field}) => <Input {...field} disabled={props.disabled} />}
			/>

		</Form.Item>;
	};
}

export function createFormCheckbox<SchemaType extends Record<string, any>>(
	control: UseFormReturn<SchemaType>["control"],
	errors: UseFormReturn<SchemaType>["formState"]["errors"]
) {
	return function FormInput(props: {
		label: string, name: Path<SchemaType>, disabled?: boolean
	} ) {
		return <Form.Item
			validateStatus={errors[props.name] && "error"}
			help={errors[props.name]?.message as string}
		>
			<Controller
				name={props.name}
				control={control}
				render={({field: {value, onChange}}) => (
					<Checkbox
						checked={value}
						onChange={e => {
							onChange(e.target.checked);
						}}
						disabled={props.disabled}
					>{props.label}</Checkbox>
				)}
			/>
		</Form.Item>;
	};
}


export function createFormSelect<SchemaType extends Record<string, any>>(
	control: UseFormReturn<SchemaType>["control"],
	errors: UseFormReturn<SchemaType>["formState"]["errors"]
) {
	return  function FormSelect(props: {
        label: string;
        name: Path<SchemaType>;
        disabled?: boolean;
        options: SelectOption[] | undefined;
		mode?: "default" | "multiple" | "tags";
    }) {
		const mode =props.mode ?? "default";

		return (
			<Form.Item
				label={props.label}
				validateStatus={errors[props.name] && "error"}
				help={errors[props.name]?.message as string}
			>
				<Controller
					name={props.name}
					control={control}
					render={({ field }) => (
						<Select {...field} options={props.options} disabled={props.disabled}
							mode={mode === "default" ? undefined : mode}>
							{props.options && props.options.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.value}
								</Select.Option>
							))}
						</Select>
					)}
				/>
			</Form.Item>
		);
	};

}
