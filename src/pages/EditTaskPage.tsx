import type {Task} from "../types/Task.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../api.ts";

function EditTaskPage() {
    const {id} = useParams<{id:string}>();
    const [task, setTask] = useState<Task>({
        title:'',
        description:'',
        dueDate:'',
        tag:''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            api.getTaskById(Number(id)).then(res => setTask(res.data));
        }
    },[id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(id){
            await api.updateTask(Number(id), task);
            navigate("/");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>
            <input name="title" value={task.title} onChange={handleChange} required />
            <input name="description" value={task.description} onChange={handleChange} />
            <input name="tag" value={task.tag} onChange={handleChange} />
            <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
}

export default EditTaskPage;