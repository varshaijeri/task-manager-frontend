import type {Task} from "./types/Task.ts";
import type {TaskContextSchema} from "./types/TaskContextSchema.ts";
import type {TaskStatus} from "./enum/TaskStatus.ts";
import base_api from "./config/axiosConfig.ts";

const tasksEndpoint = "/api/tasks";

const api = {
    getTasks: () => base_api.get<TaskContextSchema[]>(tasksEndpoint),
    getTaskById: (id: number) => base_api.get<Task>(`${tasksEndpoint}/${id}`),
    createTask: (task: Omit<TaskContextSchema, 'id'>) => base_api.post<Task>(tasksEndpoint, task),
    updateTask: (id: number, task: TaskContextSchema) =>  base_api.put<TaskContextSchema>(`${tasksEndpoint}/${id}`, task),
    deleteTask: (id: number) => base_api.delete(`${tasksEndpoint}/${id}`),
    updateTaskStatus: (id: number, status: TaskStatus) => base_api.put<TaskContextSchema>(`${tasksEndpoint}/${id}/status`, null, { params: { status } })
}
export default api;