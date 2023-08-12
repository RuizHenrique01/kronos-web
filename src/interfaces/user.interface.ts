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