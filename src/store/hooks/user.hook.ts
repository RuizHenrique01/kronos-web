
import { useRecoilValue, useSetRecoilState } from "recoil"
import { IUser } from "../../interfaces"
import { userAtom } from "../atoms";

export const useSetUserState = () => {
    const setUser = useSetRecoilState<IUser>(userAtom);
    return (data: IUser) => {
        return setUser(data);
    }
}

export const useGetUserState = () => {
    return useRecoilValue<IUser>(userAtom);
}