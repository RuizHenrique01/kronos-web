import { atom } from "recoil";
import { IMenuItem } from "../../interfaces";
import persistAtom from "../atomPersistence";


export const menuItemAtom = atom<IMenuItem>({
    key: "menuItemAtom",
    default: {} as IMenuItem,
    effects_UNSTABLE: [persistAtom('menuItemPersistence')]
});