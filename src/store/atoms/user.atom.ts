import { atom } from 'recoil';
import { IUser } from '../../interfaces';
import persistAtom from '../atomPersistence';


export const userAtom = atom<IUser>({
    key: "userAtom",
    default: {} as IUser,
    effects_UNSTABLE: [persistAtom('userPersistence')]
});