import type {TaskStatus} from "../enum/TaskStatus.ts";

export interface Task {
    id?:number;
    title: string;
    description: string;
    dueDate: string;
    tag: string;
    status: TaskStatus;
}