import { atom } from "recoil";
import { IProject } from "../../interfaces";
import persistAtom from "../atomPersistence";

export const currentProjectAtom = atom<IProject>({
    key: "currentProjectAtom",
    default: {} as IProject,
    effects_UNSTABLE: [persistAtom('currentProjectPersistence')]
});