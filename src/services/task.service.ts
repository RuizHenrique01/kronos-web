import api from "../api";
import { ITask } from "../interfaces";

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
}