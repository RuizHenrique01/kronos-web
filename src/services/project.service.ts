import api from "../api";
import { IProject } from "../interfaces";

export class ProjectsService {
    constructor() {
    }

    async getAllProjects() {

        const projects = (await api.get<Array<IProject>>('project')).data
        return projects;
    }

    async createProject({ title, description }: IProject) {
        try {
            const created = await api.post<IProject>('/project', {
                title,
                description
            },
            );
            return created;
        } catch (error) {
            throw new Error('Falha ao criar projeto!');
        }
    }

    async getOneProject(id: number) {
        const project = (await api.get<IProject>('project/' + id)).data
        return project;
    }

    async sendInvite(id: number, email: string) {
        try {
            await api.post('/project/invite/' + id, { email: email });
        } catch (err) {
            throw new Error('Falha ao enviar convite!');
        }
    }
}