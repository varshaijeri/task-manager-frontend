export interface TaskContextSchema {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    tag?: string;
}