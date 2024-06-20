import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum ThemeType {
    Light = "light",
    Dark = "dark",
    System = "system",
}

export const selectedThemeAtom = atomWithStorage<ThemeType>("appTheme", ThemeType.System);

export const systemThemeAtom = atom<ThemeType>(ThemeType.Dark);

export const computedThemeAtom = atom((get) => {
	const selected = get(selectedThemeAtom);
	const system = get(systemThemeAtom);

	switch(selected) {
	case ThemeType.System:
		return system;
	case ThemeType.Dark:
		return ThemeType.Dark;
	case ThemeType.Light:
		return ThemeType.Light;
	}
});
