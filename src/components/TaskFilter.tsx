import React from 'react';

interface Props {
    onFilterChange:  (value: string) => void;
}

export const TaskFilter: React.FC<Props> = ({onFilterChange}) => {
    return (
        <select
            onChange={(e) => onFilterChange(e.target.value)}
            className="p-2 border rounded mb-4"
        >
            <option value="">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="urgent">Urgent</option>
        </select>
    );
};