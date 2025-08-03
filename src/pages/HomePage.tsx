import type {Task} from "../types/Task.ts";
import {useEffect, useState} from "react";
import api from "../api.ts";
import {Link} from "react-router-dom";

function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        api.getTasks().then(res => setTasks(res.data));
    },[])

    const handleDelete = async (id: number) => {
        await api.deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    }
    return (
        <div>
        <h2>Task List</h2>
        <Link to="/add">Add Task</Link>
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <strong>{task.title}</strong> - {task.tag} - {task.dueDate}
                    <br />
                    <Link to={`/edit/${task.id}`}>Edit</Link>
                    <button onClick={() => handleDelete(task.id!)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
);
}

export default HomePage;
