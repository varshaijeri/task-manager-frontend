import axios from "axios";
import type {Task} from "./types/Task.ts";

const apiUrl = "http://localhost:8080/api/tasks";

const api = {
    getTasks: () => axios.get<Task[]>(apiUrl),
    getTaskById: (id: number) => axios.get<Task>(`${apiUrl}/${id}`),
    createTask: (task: Task) => axios.post<Task>(apiUrl, task),
    updateTask: (id: number, task: Task) =>  axios.put<Task>(`${apiUrl}/${id}`, task),
    deleteTask: (id: number) => axios.delete(`${apiUrl}/${id}`),
}
export default api;