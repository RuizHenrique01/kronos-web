export interface IUser {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    isAuthenticated?: boolean;
    token?: string | null;
    password?: string;
}

export interface IUsersIntegrated {
    id: number;
    userId: number;
    projectId: number;
    createdAt: string;
    updatedAt: string;
    Users: IUser
}