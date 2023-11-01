import api from "../api";
import { IFile, ITask } from "../interfaces";

export class TasksService {
    constructor() { }

    async createTaskByProject(task: ITask) {
        const createdTask = await api.post('/task', task);
        return createdTask;
    }

    async editTaskById(task: ITask) {
        const editedTask = await api.put(`/task/update/${task.id}`, {
            ...task,
            User: undefined
        });
        return editedTask;
    }

    async editTaskPositions(data: Array<ITask>) {
        const editTasks = await api.put("/task/positions", {
            tasks: data.map(d => {
                return {
                    id: d.id,
                    position: d.position,
                    boardId: d.boardId
                }
            })
        });
        return editTasks;
    }

    async deleteTaskById(id: number) {
        const deletedTask = await api.delete(`/task/${id}`);
        return deletedTask;
    }

    async uploadFile(id: number, formData: FormData) {
        const fileUpload = await api.post(`/task/${id}/upload`, formData)
        return fileUpload
    }

    async getAllFiles(id: number) {
        const allFiles = (await api.get<Array<IFile>>(`/task/${id}/files`)).data;
        return allFiles
    }

    async downloadFile(id: number, name: string) {
        const fileUpload = (await api.get(`/task/${id}/upload/${name}`, {
            responseType: 'blob'
        })).data
        return fileUpload
    }

    async removeFile(id: number, name: string) {
        const fileUpload = (await api.delete(`/task/${id}/upload/${name}`)).data
        return fileUpload
    }

    async completeTask(id: number, isComplete: boolean = true){
        await api.put(`/task/${id}/complete?isComplete=${isComplete}`);
    }
}