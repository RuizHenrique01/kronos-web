import { IUser } from ".";

export interface ITask {
    id?: number;
	name: string;
	description?: string;
	status?: string | null;
	endDate?: string;
	createdAt?: string;
	updatedAt?: string;
	boardId?: number,
	ownerId?: number,
	position?: number,
	User?: IUser,
	files?: Array<unknown>,
	dateConclusion?: Date;
} 

export interface IFile {
	name: string;
	type: string;
}