import { atom } from "recoil";
import { ISystem } from "../../interfaces";
import persistAtom from "../atomPersistence";


export const systemAtom = atom<ISystem>({
    key: "systemAtom",
    default: {} as ISystem,
    effects_UNSTABLE: [persistAtom('systemPersistence')]
});