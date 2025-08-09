import axios from "axios";
import type {Task} from "./types/Task.ts";
import type {TaskContextSchema} from "./types/TaskContextSchema.ts";
import API_BASE_URL from "./config/config.ts";
import type {TaskStatus} from "./enum/TaskStatus.ts";

const apiUrl = `${API_BASE_URL}/api/tasks`;

const api = {
    getTasks: () => axios.get<TaskContextSchema[]>(apiUrl),
    getTaskById: (id: number) => axios.get<Task>(`${apiUrl}/${id}`),
    createTask: (task: Omit<TaskContextSchema, 'id'>) => axios.post<Task>(apiUrl, task),
    updateTask: (id: number, task: TaskContextSchema) =>  axios.put<TaskContextSchema>(`${apiUrl}/${id}`, task),
    deleteTask: (id: number) => axios.delete(`${apiUrl}/${id}`),
    updateTaskStatus: (id: number, status: TaskStatus) => axios.put<TaskContextSchema>(`${apiUrl}/${id}/status`, null, { params: { status } })
}
export default api;