import { IUser, IUsersIntegrated } from ".";

export interface IProject {
    id?: number;
	title: string;
	description: string | null;
	createdAt?: string;
	updatedAt?: string;
	ownerUser?: number;
	Users?: IUser;
	UsersIntegrated?: Array<IUsersIntegrated>; 
}