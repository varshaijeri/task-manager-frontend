import React from 'react';
import {TaskStatus} from "../enum/TaskStatus.ts";
import type {TaskContextSchema} from "../types/TaskContextSchema.ts";
import {DragDropContext, Droppable, Draggable, type DropResult} from '@hello-pangea/dnd';
import api from "../api.ts";

interface KanbanBoardProps {
    tasks: TaskContextSchema[];
    // setTasks: React.Dispatch<React.SetStateAction<TaskContextSchema[]>>;
    handleDelete: (id: number) => void;
    setEditingTask: (task: TaskContextSchema) => void;
    onStatusChange: (task: TaskContextSchema) => void;
}

const statuses: TaskStatus[] = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, handleDelete, setEditingTask, onStatusChange }) => {
    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || destination.droppableId === source.droppableId) return;

        const taskId = parseInt(draggableId);
        const newStatus = destination.droppableId as TaskStatus;

        try {
            const updatedTask = (await api.updateTaskStatus(taskId, newStatus)).data;
            onStatusChange(updatedTask);
            // setTasks(prev =>
            //     prev.map(task => (task.id === taskId ? { ...task, status: updatedTask.status } : task))
            // );
            // dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
        } catch (error) {
            console.error("Failed to update task status", error);
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", gap: "20px" }}>
                {statuses.map(status => (
                    <Droppable droppableId={status} key={status} isCombineEnabled={false}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: "#f4f4f4",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    width: "300px",
                                    minHeight: "400px"
                                }}
                            >
                                <h3 className="text-gray-600 font-semibold">{status}</h3>
                                {tasks
                                    .filter(task => task.status === status)
                                    .map((task, index) => (
                                        <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: "none",
                                                        padding: "16px",
                                                        margin: "0 0 8px 0",
                                                        background: "#fff",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                        <h2 className="text-sm text-gray-600 font-semibold">{task.title}</h2>
                                                        <p className="text-sm text-gray-600">{task.description}</p>
                                                        <p className="text-sm text-gray-400">{task.dueDate}</p>
                                                        <p
                                                            className="text-sm bg-blue-100 text-blue-800 rounded p-1 mt-1">
                                                                        {task.tag}
                                                                    </p>
                                                                    <div className="flex gap-2 mt-2">
                                                                        <button
                                                                            onClick={() => setEditingTask(task)} // open in form
                                                                            className="text-blue-600 hover:underline text-sm"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete(task.id)}
                                                                            className="text-red-600 hover:underline text-sm"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
