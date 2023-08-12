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
	User?: IUser
} 