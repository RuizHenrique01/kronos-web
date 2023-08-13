import { useRecoilValue, useSetRecoilState } from "recoil"
import { IProject } from "../../interfaces"
import { currentProjectAtom } from "../atoms";

export const useSetCurrentProjectState = () => {
    const setProject = useSetRecoilState<IProject>(currentProjectAtom);
    return (data: IProject) => {
        return setProject(data);
    }
}

export const useGetCurrentProjectState = () => {
    return useRecoilValue<IProject>(currentProjectAtom);
}