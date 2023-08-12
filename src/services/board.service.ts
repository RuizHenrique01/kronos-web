import api from '../api';
import { IBoard } from '../interfaces';

export class BoardsService {
    
    constructor () {}

    async getAllboardsByProject(id: number) {
        const boards = (await api.get<Array<IBoard>>(`board/${id}`)).data;
        return boards;
    }

}