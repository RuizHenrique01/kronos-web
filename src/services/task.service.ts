import api from "../api";
import { ITask } from "../interfaces";

export class TasksService {
    constructor() {}

    async createTaskByProject(task: ITask) {
        const createdTask = await api.post('/task', task);
        return createdTask;
    }

    async editTaskById(task: ITask) {
        console.log(task);
        const editedTask = await api.put(`/task/${task.id}`, {
            ...task,
            User: undefined
        });
        return editedTask;
    }

    async deleteTaskById(id: number) {
        const deletedTask = await api.delete(`/task/${id}`);
        return deletedTask;
    }
}