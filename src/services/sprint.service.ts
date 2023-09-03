import api from "../api";
import { ISprint } from "../interfaces";

export class SprintService {
    constructor() { }

    async getSprintInProgress(idProject: number) {
        try {
            const sprint = await api.get(`/sprint/inProgress/${idProject}`);
            return sprint.data.sprint;
        } catch (err) {
            throw new Error('Falha ao retornar sprint!')
        }
    }

    async createSprint(sprint: ISprint, idProject: number) {
        const createdSprint = await api.post('/sprint', {
            title: sprint.title,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            projectId: idProject,
        });
        return createdSprint;
    }
}