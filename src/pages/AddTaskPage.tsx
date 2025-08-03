import {useState} from "react";
import type {Task} from "../types/Task.ts";
import {useNavigate} from "react-router-dom";
import api from "../api.ts";

function AddTaskPage() {
    const [task, setTask] = useState<Task>({
        title:'',
        description:'',
        dueDate:'',
        tag:''
    })

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await api.createTask(task);
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <input name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={task.description} onChange={handleChange} />
        <input name="tag" placeholder="Tag" value={task.tag} onChange={handleChange} />
        <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange} />
        <button type="submit">Save</button>
    </form>
    );
}

export default AddTaskPage;
