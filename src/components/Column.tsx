import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';
import { StrictModeDroppable } from './StrictModeDroppable';

interface ColumnProps {
  title: string;
  tasks?: Task[]; // Make tasks optional
  id: Task['status'];
}

const Column: React.FC<ColumnProps> = ({ title, tasks = [], id }) => {
  // Get column color based on status
  const getColumnColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-50 border-blue-200';
      case 'inProgress':
        return 'bg-yellow-50 border-yellow-200';
      case 'peerReview':
        return 'bg-purple-50 border-purple-200';
      case 'done':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg w-80 flex flex-col border ${getColumnColor(id)} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <h2 
          id={`column-${id}`} 
          className="font-bold text-lg text-gray-700 flex items-center"
        >
          {title}
          <span className="ml-2 bg-white text-xs font-semibold px-2 py-1 rounded-full text-gray-600">
            {tasks.length}
          </span>
        </h2>
      </div>
      
      <StrictModeDroppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors duration-300 rounded-md flex-grow
              ${snapshot.isDraggingOver ? 'bg-gray-100/80 ring-2 ring-inset ring-gray-200' : ''}`}
            aria-labelledby={`column-${id}`}
          >
            {tasks?.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
}

export default Column;