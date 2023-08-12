import { ITask } from ".";

export interface IBoard {
    id?: number;
    name: string;
    description?: string;
    isMobile?: boolean;
    isSprint?: boolean;
    createdAt?: string;
    updatedAt?: string;
    projectId?: number;
    Tasks?: Array<ITask>;
}