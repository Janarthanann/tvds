import styled from "@emotion/styled";
import { Select as AntdSelect } from "antd";
import { BaseOptionType } from "antd/lib/cascader";
import { DefaultOptionType, SelectProps } from "antd/lib/select";
import React from "react";
import { DropDownItem } from "./dropDown";

const dark = "var(--ant-primary-7)";
const color = "var(--ant-primary-6)";
const lite = "var(--ant-primary-5)";
const bgColor = "white";
const bgLite = "#eee";
const bgFade = "#ddd";

const DisabledButton = styled.button(
	{
		padding: "0.25rem 0.625rem",
		fontWeight: "600",
		minWidth: "50px",
		border: "1px solid #0000",
		boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 4px",
		color: "#666",
		cursor: "not-allowed",
		backgroundColor: "#aaa",
	},
	(props: { fullWidth?: boolean }) => ({
		width: props.fullWidth ? "100%" : undefined,
	}),
);
DisabledButton.defaultProps = { disabled: true };

  interface ButtonProps {
	fullWidth?: boolean;
	secondary?: boolean;
  }

export const ActiveButton = styled.button(
	{
		padding: "0.25rem 0.625rem",
		fontWeight: "600",
		minWidth: "50px",
		borderRadius: "0.125rem",
		boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 4px",
		cursor: "pointer",
		transitionProperty: "background-color, color, border",
		transitionTimingFunction: "linear",
	},
	({ fullWidth, secondary }: ButtonProps) => ({
		width: fullWidth ? "100%" : undefined,
		color: !secondary ? bgColor : color,
		transitionDuration: !secondary ? "0.25s" : "0.15s",
		border: `0.0625rem solid ${!secondary ? color : lite}`,
		backgroundColor: !secondary ? dark : bgFade,
	}),
);

export const SimpleButton = styled.button(
	{
		padding: "0.25rem 0.625rem",
		fontWeight: "600",
		minWidth: "50px",
		borderRadius: "0.125rem",
		boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 4px",
		cursor: "pointer",
		transitionProperty: "background-color, color, border",
		transitionTimingFunction: "linear",
	},
	({ fullWidth, secondary }: ButtonProps) => ({
		width: fullWidth ? "100%" : undefined,
		backgroundColor: !secondary ? color : bgColor,
		color: !secondary ? bgColor : color,
		transitionDuration: !secondary ? "0.25s" : "0.15s",
		border: `0.0625rem solid ${!secondary ? color : lite}`,
		"&:hover": {
			backgroundColor: !secondary ? lite : bgLite,
		},
		"&:active": {
			backgroundColor: !secondary ? dark : bgFade,
		},
	}),
);

export const Button = ({
	isDisabled,
	isActive,
	...props
}: Parameters<typeof SimpleButton>[0] & {
	isDisabled?: boolean;
	isActive?: boolean;
  }) => {
	return (
		<>
			{!isDisabled ? (
				!isActive ? (
					<SimpleButton {...props} />
				) : (
					<ActiveButton {...props} />
				)
			) : (
				<DisabledButton {...props} />
			)}
		</>
	);
};


type OptionType = DefaultOptionType | BaseOptionType;

type SelectType = SelectProps<unknown, BaseOptionType | DefaultOptionType> & {
  children?: React.ReactNode;
};

export const Select = (props: SelectType) => (
	<AntdSelect
		{...props}
		getPopupContainer={(trigger: { parentNode: HTMLElement }) =>
			trigger.parentNode
		}
		showSearch
		filterOption={(input: string, option?: OptionType) => (
			typeof option?.children === "string" &&
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

		)}
		filterSort={(optionA: OptionType, optionB: OptionType) =>
			typeof optionA?.children === "string" &&
      typeof optionB?.children === "string"
				? optionA.children
					?.toLowerCase()
					.localeCompare(optionB.children.toLowerCase())
				: 0
		}
	/>
);

Select.Option = AntdSelect.Option;

export const Dropdown = (
	props: Parameters<typeof Select>[0] & {
 items?: DropDownItem[] | null;
	},
) => {
	const { items, ...rest } = props;
	const selectedValue = React.useRef<unknown>();

	React.useEffect(() => {
		const entry = (items as Array<DropDownItem>)?.find(
			(i) => i.id === rest.value,
		);
		const selectedEntry = (
		items as Array<DropDownItem>
		)?.find((i) => i.id === selectedValue.current);

		if (rest.value !== undefined) {
			selectedValue.current = rest.value;
		}

		if (!entry && rest.value !== undefined && rest.onChange) {
			rest.onChange(undefined, []);
		}

		if (selectedEntry && rest.onChange) {
			rest.onChange(selectedValue.current, []);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	return (
		<Select {...rest}>
			{items?.map((item) => (
				<Select.Option key={item.id} value={item.id}>
					{item.name}
				</Select.Option>
			))}
		</Select>
	);
};