import dayjs from "dayjs";
import React from "react";
import superjson from "superjson";

export const locale = "en-IN";

export const priceToString = (price: string | number | null | undefined) =>
	new Intl.NumberFormat(locale, { style: "currency", currency: "INR" })
		.format(price ? +price / 100 : 0)
		.replace(/^(\D+)/, "$1 ");

export const zipEqual = <T, T2>(arr: T[], arr2: T2[]): [T, T2][] => {
	if (arr.length !== arr2.length) {
		throw new Error("zipEqual called on different size array");
	}
	return arr.map((value, idx) => [value, arr2[idx]]);
};

export const formatPrice = (price: string | number | null | undefined) =>
	new Intl.NumberFormat(locale, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
		.format(price ? +price / 100 : 0)
		.replace(/^(\D+)/, "$1 ");

export const formatNumber = (num: string | number | null | undefined) =>
	new Intl.NumberFormat(locale).format(num ? +num : 0);

export const formatDate = (date: string | Date | null | undefined) =>
	date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss A") : "";

export const toUrlString = (str?: string): string =>
	!str ? "" : str.split(" ").join("-").toLowerCase();

export function parseLocaleNumber(
	stringNumber: string,
	locale: string
): number {
	const thousandSeparator = Intl.NumberFormat(locale)
		.format(11111)
		.replace(/\p{Number}/gu, "");
	const decimalSeparator = Intl.NumberFormat(locale)
		.format(1.1)
		.replace(/\p{Number}/gu, "");

	return parseFloat(
		stringNumber
			.replace(new RegExp("\\" + thousandSeparator, "g"), "")
			.replace(new RegExp("\\" + decimalSeparator), ".")
	);
}

export function useAsyncMemo<T>(
	factory: () => Promise<T> | undefined | null,
	deps?: React.DependencyList,
	initial?: T
) {
	const [val, setVal] = React.useState<T | undefined>(initial);
	React.useEffect(() => {
		let cancel = false;
		const promise = factory();
		if (promise === undefined || promise === null) return;
		void promise.then((val) => {
			if (!cancel) {
				setVal(val);
			}
		});
		return () => {
			cancel = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps ?? []);
	return val;
}

export function superJsonParse<T>(val: string) {
	try {
		console.log("Parse val", superjson.parse(val));

		return superjson.parse(val) as T;
	} catch (error) {
		console.log("super json parse error : ", error);
		return null;
	}
}
