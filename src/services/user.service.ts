import api from "../api";

export class UserService {
    constructor() { }

    async getUser() {
        try {
            const user = await api.get(`/user`);
            return user.data;
        } catch (err) {
            throw new Error('Falha ao retornar usuário!')
        }
    }

    async sendResetPassword(email: string) {
        try {
            await api.post('/user/send-email-reset-password', { email: email });
        } catch (err) {
            throw new Error('Error ao enviar email!');
        }
    }
}