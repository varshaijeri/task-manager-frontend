import React, {useEffect, useState} from 'react';
import * as z from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type {Task} from "../types/Task.ts";
import type {TaskContextSchema} from "../types/TaskContextSchema.ts";
import {TaskStatus} from "../enum/TaskStatus.ts";

//zod: schema declaration and validation library
const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    dueDate: z.string().min(1, 'Due Date is required'),
    tag: z.string().optional(),
    status: z.string().optional()
});

type TaskFormInputs = z.infer<typeof schema>;

type Props = {
    onSubmit: (data: TaskFormInputs) => void;
    defaultValues?: TaskContextSchema | null | undefined; // optional for edit
};

const TaskForm: React.FC<Props> = ({onSubmit, defaultValues}) => {
    // const {
    //     // register,
    //     handleSubmit,
    //     // formState: { errors },
    // } = useForm<TaskFormInputs>({
    //     resolver: zodResolver(schema),
    // });

    const [formData, setFormData] = useState<Omit<Task, 'id'>>({
        title: '',
        description: '',
        dueDate: '',
        tag: '',
        status: TaskStatus.TODO
    });

    useEffect(() => {
        if (defaultValues) {
            setFormData({
                title: defaultValues.title || '',
                description: defaultValues.description || '',
                dueDate: defaultValues.dueDate || '',
                tag: defaultValues.tag || '',
                status: defaultValues.status
            });
        }
    }, [defaultValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.dueDate) return; // basic validation
        onSubmit(formData);
        setFormData({ title: '', description: '', dueDate: '', tag: '', status: TaskStatus.TODO}); // reset if adding
        toast.success('Task saved successfully');
    };

    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="border p-2 w-full"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 w-full"
                />
                <input
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full"
                />
                <input
                    name="tag"
                    type="text"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="Tag (e.g., work)"
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {defaultValues ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </>
    );
};

export default TaskForm;