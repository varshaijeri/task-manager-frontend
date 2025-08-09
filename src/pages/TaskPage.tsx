import React, { useEffect, useState } from 'react';
import { TaskFilter } from '../components/TaskFilter';
import { useTaskContext } from '../context/TaskContext';
import api from "../api.ts";
import TaskForm from "../components/TaskForm.tsx";
import type {TaskContextSchema} from "../types/TaskContextSchema.ts";
import KanbanBoard from "../components/KanbanBoard.tsx";
import type {TaskStatus} from "../enum/TaskStatus.ts";

type Task = {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    tag?: string;
    status: TaskStatus;
};


const TaskPage: React.FC = () => {
    const { state, dispatch } = useTaskContext();
    const [filter, setFilter] = useState('');
    const [tasks, setTasks] = useState<TaskContextSchema[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);


    const fetchTasks = async () => {
        const res = await api.getTasks();
        setTasks(res.data);
        // dispatch({ type: 'SET_TASKS', payload: res.data });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // const filteredTasks = filter
    //     ? state.tasks.filter((task) => task.tag?.toLowerCase() === filter.toLowerCase())
    //     : state.tasks;

    const handleCreate = async (taskData: Omit<TaskContextSchema, 'id'>) => {
        await api.createTask(taskData);
        fetchTasks(); // refresh list
    };

    const handleDelete = async (id: number) => {
        await api.deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id));
        // dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const handleUpdate = async (task: TaskContextSchema) => {
        const res = await api.updateTask(task.id, task);
        dispatch({ type: 'UPDATE_TASK', payload: res.data });
    };

    // const handleStatusChange = async (taskId: number, newStatus: TaskStatus) => {
    //     await api.updateTaskStatus(taskId, newStatus);
    //     fetchTasks(); // Refresh after update
    // };


    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <TaskForm
                onSubmit={(task:any) => {
                    if (editingTask) {
                        handleUpdate({ ...task, id: editingTask.id });
                        setEditingTask(null);
                    } else {
                        handleCreate(task);
                    }
                }}
                defaultValues={editingTask}
            />
            <TaskFilter onFilterChange={setFilter} />
            {/*<ul className="space-y-2">*/}
            {/*    {filteredTasks.map((task) => (*/}
            {/*        <li key={task.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm flex flex-col">*/}
            {/*            <h2 className="text-sm text-gray-600 font-semibold">{task.title}</h2>*/}
            {/*            <p className="text-sm text-gray-600">{task.description}</p>*/}
            {/*            <span className="text-sm text-gray-400">{task.dueDate}</span>*/}
            {/*            <span className="text-xs bg-blue-100 text-blue-800 rounded p-1 w-fit mt-1">*/}
            {/*                {task.tag}*/}
            {/*            </span>*/}
            {/*            <div className="flex gap-2 mt-2">*/}
            {/*                <button*/}
            {/*                    onClick={() => setEditingTask(task)} // open in form*/}
            {/*                    className="text-blue-600 hover:underline text-sm"*/}
            {/*                >*/}
            {/*                    Edit*/}
            {/*                </button>*/}
            {/*                <button*/}
            {/*                    onClick={() => handleDelete(task.id)}*/}
            {/*                    className="text-red-600 hover:underline text-sm"*/}
            {/*                >*/}
            {/*                    Delete*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <KanbanBoard tasks={tasks} setTasks={setTasks} handleDelete={handleDelete} setEditingTask={setEditingTask}/>
        </div>
    );
};

export default TaskPage;
