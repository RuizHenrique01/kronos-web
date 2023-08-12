
import { useRecoilValue, useSetRecoilState } from "recoil"
import { IMenuItem } from "../../interfaces"
import { menuItemAtom } from "../atoms";

export const useSetMenuItemState = () => {
    const setMenuItem = useSetRecoilState<IMenuItem>(menuItemAtom);
    return (data: IMenuItem) => {
        return setMenuItem(data);
    }
}

export const useGetMenuItemState = () => {
    return useRecoilValue<IMenuItem>(menuItemAtom);
}