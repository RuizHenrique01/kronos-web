import api from "../api";
import { AuthenticateService } from "./authenticate-service";

export class ProjectsService {
    constructor() {
        this.authService = new AuthenticateService();
    }

    async getAllProjects() {

        const projects = (await api.get('project')).data
        return projects;
    }

    async getOneProjects(id) {
        const project = (await api.get('project/' + id)).data
        return project;
    }

    async sendInvite(id, email) {
        try {
            await api.post('/project/invite/' + id, { email: email });
        } catch (err) {
            throw new Error(err);
        }
    }
}