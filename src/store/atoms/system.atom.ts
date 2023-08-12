import { atom } from "recoil";
import { ISystem } from "../../interfaces";


export const systemAtom = atom<ISystem>({
    key: "systemAtom",
    default: {} as ISystem
});