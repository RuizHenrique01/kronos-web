//import jwt from 'jwt-decode';
import api from '../api';
import { IAuth, IUser } from '../interfaces';

export class AuthenticateService {

    constructor() {}

    async authentication(data: IAuth) {
        try {

            const login = await api.post('/auth/signin', {
                email: data.email,
                password: data.password
            });

            return login;
        } catch (error) {
            throw new Error('Falha ao realizar a autenticação!');
        }
    }

    async createUser({ name, lastName, email, password, phone = "99999999999" }: IUser) {
        try {
            const created = await api.post('/auth/signup', {
                name,
                lastName,
                email,
                password,
                phone
            });
            return created;
        } catch (error) {
            throw new Error('Falha ao na criação do Usuário!');
        }
    }

    setToken(token: string) {
        localStorage.removeItem('token');
        localStorage.setItem('token', token);
    }

    // decodeToken(token) {
    //     if (!token) return null;

    //     try {
    //         const decodeToken = jwt(token);
    //         return decodeToken;
    //     } catch (error) {
    //         return null
    //     }
    // }

    // isValidToken(token) {
    //     if (!token) return false;

    //     return true;
    // }

    getToken() {
        const localToken = localStorage.getItem('token');
        if (!localToken) {
            return null;
        }
        return localToken;
    }

    logout() {
        localStorage.clear();
    }
}