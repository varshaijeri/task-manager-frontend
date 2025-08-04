import axios from "axios";
import type {Task} from "./types/Task.ts";
import type {TaskContextSchema} from "./types/TaskContextSchema.ts";
import API_BASE_URL from "./config/config.ts";

const apiUrl = `${API_BASE_URL}/api/tasks`;

const api = {
    getTasks: () => axios.get<TaskContextSchema[]>(apiUrl),
    getTaskById: (id: number) => axios.get<Task>(`${apiUrl}/${id}`),
    createTask: (task: Omit<TaskContextSchema, 'id'>) => axios.post<Task>(apiUrl, task),
    updateTask: (id: number, task: TaskContextSchema) =>  axios.put<TaskContextSchema>(`${apiUrl}/${id}`, task),
    deleteTask: (id: number) => axios.delete(`${apiUrl}/${id}`),
}
export default api;