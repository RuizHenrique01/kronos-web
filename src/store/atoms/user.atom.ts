import { atom } from 'recoil';
import { IUser } from '../../interfaces';


export const userAtom = atom<IUser>({
    key: "userAtom",
    default: {} as IUser
});