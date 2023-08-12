
import { useRecoilValue, useSetRecoilState } from "recoil"
import { ISystem } from "../../interfaces"
import { systemAtom } from "../atoms";

export const useSetSystemState = () => {
    const setSystem = useSetRecoilState<ISystem>(systemAtom);
    return (data: ISystem) => {
        return setSystem(data);
    }
}

export const useGetSystemState = () => {
    return useRecoilValue<ISystem>(systemAtom);
}