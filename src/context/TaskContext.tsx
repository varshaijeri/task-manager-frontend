import React, {createContext, useContext, useReducer} from 'react';
import type {TaskContextSchema} from "../types/TaskContextSchema.ts";

type TaskState = {
    tasks: TaskContextSchema[];
};

const initialState: TaskState = {
    tasks: [],
};

type Action =   | { type: 'SET_TASKS'; payload: TaskContextSchema[] }
                | { type: 'ADD_TASK'; payload: TaskContextSchema }
                | { type: 'DELETE_TASK'; payload: number }
                | { type: 'UPDATE_TASK'; payload: TaskContextSchema };

function reducer(state: TaskState, action: Action): TaskState {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.payload };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(t => (t.id === action.payload.id ? action.payload : t)),
            };
        default:
            return state;
    }
}
const TaskContext = createContext<{
    state: TaskState;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);